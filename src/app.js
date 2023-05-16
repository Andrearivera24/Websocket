import express from 'express';
import { productRouter } from './routes/products.router.js';
import { cartRouter } from './routes/cart.router.js';
import { viewsRouter } from './routes/views.router.js';
import { userRouter } from './routes/users.router.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
const httpServer = app.listen(8080, () => {
  console.log('Listening on PORT 8080');
});

 
const socketServer = new Server(httpServer); // creo un nuevo servidor para trabajar con sockets, tiene el que ya creé.

app.use(express.static('public')); // Expongo como un sitio estático la carpeta public. acá vinculo la carpeta public
app.use(express.json()); // Middelare que parsea json
app.use(express.urlencoded({ extended: true })); // middleware para parsear los datos de la petición

app.use('/api/products', productRouter); // Utilizo ruta de products para '/api/products'
app.use('/api/carts', cartRouter); // Utilizo ruta de carts para '/api/carts'

// ------Clase de motores de plantillas (rutas)
app.use('/', viewsRouter);
app.use('/api/users', userRouter);

//seteo handlers
app.engine('handlebars', handlebars.engine());
app.set('views', 'views/'); //seteo la vista de la carpeta raíz vistas
app.set('view engine', 'handlebars');

//----- Clase de Websocket (enseño al servidor a escuchar el handsShake)

socketServer.on('connection', (socket)=>{
  console.log('Nuevo cliente conectado');
})




//socketServer.on('connection', (socket) => {
  //console.log('Nuevo cliente conectado'); //--> Mostrará el mensaje cada vez que un cliente nuevo se contecte.

  //escucho cuando el socket cliente envíe un mensaje
 // socket.on('message', (data) => {
    //console.log(data);
 // });

  // //Enviar mensajes desde el servidor (individual, tipo excluyente, allinclusive)
  // socket.emit(
  //   'message_individual',
  //   'Este mensaje solo lo debe recibir el socket.'
  // );
  // socket.broadcast.emit(
  //   'message_excluyente',
  //   'Este mensaje le llega a todos menos a el socket actual desde el que se envió el mensaje.'
  // );
  // socketServer.emit(
  //   'message_allInclusive',
  //   'Este mensaje lo verán todos los sockets conectados'
  // );
//});
