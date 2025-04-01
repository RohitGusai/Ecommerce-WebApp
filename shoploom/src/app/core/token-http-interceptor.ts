import { HttpInterceptorFn } from "@angular/common/http";

export const tokenHttpInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Interceptor called for:", req.url);
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem("token");
    console.log("Token Retrieved:", token);

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization:token,
        },
      });
    }
  } else {
    console.log("Interceptor running in a non-browser environment (SSR/Node.js). Skipping token.");
  }

  return next(req);
};

// const isBrowser = typeof window !== "undefined";
// export const tokenHttpInterceptor: HttpInterceptorFn=(req,next)=>{
//   if (!isBrowser) return next(req);
//   const token = localStorage?.getItem("token");
//   if(token)
//   {
//     req=req.clone({
//       setHeaders:{
//         Authorization:`Bearer ${token}`,
//       },
//     });
//   }
//   return next(req);
// }



