import { Router } from "express";

const viewsRouter = Router(); // creo la ruta


viewsRouter.get('/', (req, res)=>{
res.render('index', {})
});



export {viewsRouter};