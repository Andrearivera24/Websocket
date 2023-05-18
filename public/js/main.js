const socket = io(); // creo una conexion
function sendMenssage() {
  // se ejecuta cuando clickeo el boton dle inde.handlebars
  console.log("sendMenssage");
  const message = document.getElementById("message").value; // traigo el mensaje que está en el id menssaje del documento html.
  socket.emit("new-message", message); // emiti ese valor, como un nuevo mensaje con el valor, al socket, que lo pushea y emote
}

function render(products) {
  const html = data // crea una constante html
    .map((elem, index) => {
      //con todos los elementos del data(strings), los mapee dentro de un div y un em
      return `<div>
        <em>${elem}</em>
        </div>`;
    })
    .join(" "); //uno con un espacio
  document.getElementById("messages").innerHTML = html;
}

socket.on("messages", (products) => {
  // se queda escuchando mensajes y si recibo un mensaje, ejecuto rende con la info
  render(products); // envía el mensaje con le función de arriba
});
