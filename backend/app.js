const express = require('express')
const mongoose = require('mongoose')
const app = express();
const categoryRoutes = require('./routes/category')
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product')
const customerRoutes = require('./routes/customer');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderad');
const {VerifyUser,isAdmin} = require('./middleware/auth-middleware')
const {Server}= require('socket.io')
const http = require('http');
const cors = require("cors");
const server = http.createServer(app);


app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200", // Allow frontend connections
  },
});
app.use(express.json());

const port = 3000
const socketPort = 4000;

io.on('connection',(socket)=>{
  console.log(`User connected: ${socket.id}`);

  socket.on("joinChatRoom",(room)=>{
    socket.join(room);
    console.log(`User Joined the Chat${room}`)
  })

  socket.on("sendMessage",({room,message})=>
  {
    io.to(room).emit("receiveMessage",message);
  })

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

})

server.listen(socketPort, () => {
  console.log(`WebSocket Server running on port ${socketPort}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/category",VerifyUser,isAdmin,categoryRoutes)
app.use("/brands",VerifyUser,isAdmin,brandRoutes)
app.use("/product",VerifyUser,isAdmin,productRoutes)
app.use("/customer",VerifyUser,customerRoutes)
app.use("/orderad",VerifyUser,isAdmin,orderRoutes)
app.use('/auth',authRoutes)

async function connectdb()
{
    await mongoose.connect("mongodb://localhost:27017",{
        dbname : "shoploomdb",
    });
    console.log("Happily Connected to the database");

}
connectdb().catch((err) =>
{
    console.log("Error find while connecting to the database")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})