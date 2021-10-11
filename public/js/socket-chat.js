var socket = io();


var param = new URLSearchParams(window.location.search);

if(!param.has('nombre') || !param.has('sala') ){
    window.location = 'index.html';
    throw new Error('El nombre y la sala son necesarios');
}

var usuario = { 
    nombre: param.get('nombre'),
    sala: param.get('sala'),
}

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function( resp ){
        console.log(resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor'); 

});


// Enviar información
// socket.emit('enviarMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});
//Escuchar cuando un usuario entra o sale del chat

socket.on('listaPersonas',  function(presonas){
    console.log(presonas);
});

//Mensajes privados
socket.on('mensajePrivado', function( mensaje ) {

    console.log('Mensaje Privado : ', mensaje);

});
