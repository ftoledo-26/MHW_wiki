const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

const PORT = 3001;
const MONGOURL = "mongodb://localhost:27017";
const nombre_BD = "MH_Wiki";
const Usurios = "Usuarios";
const Monstruos = "Monstruos"
const Armas = "Armas"
const Lugares = "Lugares"
const Armaduras = "Armaduras"
const Items = "Items"



app.use(cors());
app.use(express.json());

 

async function conectarUsuariosDB() {
    const client = new MongoClient(MONGOURL); // Creamos un nuevo cliente de MongoDB
    await client.connect(); // Nos conectamos al servidor de MongoDB
    console.log("Conectado a MongoDB"); // Confirmamos la conexión en la consola
    return client.db(nombre_BD).collection(Usurios); // Devolvemos la colección "usuario" dentro de la BD "BD_usuarios"
}
async function conectarArmadurasDB() {
    const client = new MongoClient(MONGOURL); // Creamos un nuevo cliente de MongoDB
    await client.connect(); // Nos conectamos al servidor de MongoDB
    console.log("Conectado a MongoDB"); // Confirmamos la conexión en la consola
    return client.db(nombre_BD).collection(Armaduras); // Devolvemos la colección "usuario" dentro de la BD "BD_usuarios"
}
async function conectarLugaresDB() {
    const client = new MongoClient(MONGOURL); // Creamos un nuevo cliente de MongoDB
    await client.connect(); // Nos conectamos al servidor de MongoDB
    console.log("Conectado a MongoDB"); // Confirmamos la conexión en la consola
    return client.db(nombre_BD).collection(Lugares); // Devolvemos la colección "usuario" dentro de la BD "BD_usuarios"
}
async function conectarArmasDB() {
    const client = new MongoClient(MONGOURL); // Creamos un nuevo cliente de MongoDB
    await client.connect(); // Nos conectamos al servidor de MongoDB
    console.log("Conectado a MongoDB"); // Confirmamos la conexión en la consola
    return client.db(nombre_BD).collection(Armas); // Devolvemos la colección "usuario" dentro de la BD "BD_usuarios"
}
async function conectarMonstruosDB() {
        const client = new MongoClient(MONGOURL); // Creamos un nuevo cliente de MongoDB
        await client.connect(); // Nos conectamos al servidor de MongoDB
        console.log("Conectado a Monstruo"); // Confirmamos la conexión en la consola
        return client.db(nombre_BD).collection(Monstruos); // Devolvemos la colección "usuario" dentro de la BD "BD_usuarios"
}

app.get("/Monstruos", async (req, res) => {
    try {
        const collection = await conectarMonstruosDB();
        const monstruos = await collection.find({}).toArray();
        res.json(monstruos);  // Enviar los datos como respuesta JSON
    } catch (error) {
        console.error("Error al obtener los monstruos:", error);
        res.status(500).json({ error: "Error al obtener los datos." });
    }
});

app.get("/Armas", async (req , res)=>{
    try {
        const collection = await conectarArmasDB();
        const Armas = await collection.find({}).toArray();
        res.json(Armas)
    }catch(error){
        console.error("Error al conectar las armas")
        res.status(500).json({error: "Error al obtener los datos"})
    }
})



//////////////////////////////////////Agonizaaaaaaaaaaaaaaaaaaaaaa
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`); // Confirmación en la consola
});