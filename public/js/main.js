const socket = io(); // instancio el socket y lo guardo en una constante, lo utilizo para comunicarme con el socket del servidor 

//socket.emit('message', 'Hola, me estoy comunicando desde un Websocket'); 

//escucho los eventos que envía el servidor 
// socket.on('message_individual', (data)=>{
//     console.log(data);
// })

// socket.on('message_excluyente', (data)=>{
//     console.log(data);
// })
// socket.on('message_allInclusive', (data)=>{
//     console.log(data);
// })