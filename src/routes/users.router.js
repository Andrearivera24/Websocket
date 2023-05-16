
import { Router } from "express";
import { userController } from "../controllers/UserConstroller.js";

const userRouter = Router();

// metodo post para agregar un usuario usando la clase del controlador 
userRouter.post('/', (req, res)=>{
userController.addUser(req.body)
res.status(201).send();
})


export{userRouter};
