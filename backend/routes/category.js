const express = require("express");
const Category = require("../db/category");
const { addCategory, updateCategory,deleteCategory, getCategories,getCategoryById } = require("../handlers/category-handler");
const router = express.Router();

router.post("", async (req, res) => {
    try {
        let model = req.body;
        console.log("Data received:", model);

        let result  = await addCategory(model);
        res.send(result);

    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("", async function(req,res)
{
     let result = await getCategories();
     res.send(result);
})

router.get("/:id", async function(req,res)
{
    let id = req.params["id"];
     let result = await getCategoryById(id);
     res.send(result);
})

router.put("/:id", async (req, res) => {
    try {
        let model = req.body;
        let id = req.params["id"]

        console.log("Data received:", model);
        await updateCategory(id,model);
        res.status(201).send({message : "Data is Updated Successfully"});
    } catch (error) {
        console.error("Error saving category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.delete("/:id", async function(req,res)
{
    let id = req.params["id"]
    await deleteCategory(id);
    res.send({message : "data deleted Successfully"});
})

module.exports = router;
