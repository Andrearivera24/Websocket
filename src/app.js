import express from "express";
import { productRouter } from "./routes/products.router.js";
import { cartRouter } from "./routes/cart.router.js";
import { viewsRouter } from "./routes/views.router.js";
import { userRouter } from "./routes/users.router.js";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("Listening on PORT 8080");
});

const socketServer = new Server(httpServer); // creo un nuevo servidor para trabajar con sockets, tiene el que ya creé.

app.use(express.static("public")); // Expongo como un sitio estático la carpeta public. acá vinculo la carpeta public
app.use(express.json()); // Middelare que parsea json
app.use(express.urlencoded({ extended: true })); // middleware para parsear los datos de la petición

app.use("/api/products", productRouter); // Utilizo ruta de products para '/api/products'
app.use("/api/carts", cartRouter); // Utilizo ruta de carts para '/api/carts'

// ------Clase de motores de plantillas (rutas)
app.use("/", viewsRouter);
app.use("/api/users", userRouter);

//seteo handlers
app.engine("handlebars", handlebars.engine());
app.set("views", "views/"); //seteo la vista de la carpeta raíz vistas
app.set("view engine", "handlebars");

//----- Clase de Websocket (enseño al servidor a escuchar el handsShake)
  const messages = []; 

  socketServer.on("connection", (socket) => {
    console.log("Nuevo cliente conectado"); //--> Mostrará el mensaje cada vez que un cliente nuevo se contecte.
    socket.emit( // al nuevo socket que se conecte enviale este mensaje, que en principio es un array vacío.
      "messages",
      messages
    );

    //Luego le digo que se quede escuchando y que cuando envíe un nuevo mensaje, lo logee, lo pushee al array y lo emita a todos.
    socket.on('new-message', (message)=>{
      console.log(message);
      messages.push(message); 
      socketServer.emit('messages', messages); //allInclusive
    });
  });

