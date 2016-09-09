var crypto = require("crypto");

var password = "1234";

// Ejemplo 1
var hashpassword = crypto.createHash("sha1")
                        .update(password)
                        .digest("hex");
console.log(`Ej 1: password encriptada: ${hashpassword}`);


// Ejemplo 2 - Salt
var salt = Math.round((new Date().valueOf() * Math.random()))+'';
var hashpassword = crypto.createHash("sha512")
                        .update(salt+password)
                        .digest("hex");
console.log(salt);
console.log(`Ej 2: password encriptada con salt: ${hashpassword}`);
