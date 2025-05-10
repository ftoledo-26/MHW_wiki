const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

const PORT = 3001;
const MONGOURL = "mongodb://localhost:27017";
const nombre_BD = "MH_Wiki";
const Usurios = "Usuarios";
const Monstruos = "Monstruos";
const Armas = "Armas";
const Lugares = "Lugares";
const Armaduras = "Armaduras";
const Items = "Items";

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/MH_Wiki", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

const userSchema = new mongoose.Schema({
    nombre: String,
    email: String,
    rol: String,
});

const User = mongoose.model("User", userSchema);

// Crear usuario
app.post("/User", async (req, res) => {
    const { nombre, email } = req.body;

    const nuevoUsuario = new User({
        nombre,
        email,
        rol: "Usuario",
    });

    try {
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario creado con éxito" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});

async function conectarUsuariosDB() {
    const client = new MongoClient(MONGOURL);
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db(nombre_BD).collection(Usurios);
}

async function conectarArmadurasDB() {
    const client = new MongoClient(MONGOURL);
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db(nombre_BD).collection(Armaduras);
}

async function conectarLugaresDB() {
    const client = new MongoClient(MONGOURL);
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db(nombre_BD).collection(Lugares);
}

async function conectarArmasDB() {
    const client = new MongoClient(MONGOURL);
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db(nombre_BD).collection(Armas);
}

async function conectarMonstruosDB() {
    const client = new MongoClient(MONGOURL);
    await client.connect();
    console.log("Conectado a Monstruos");
    return client.db(nombre_BD).collection(Monstruos);
}

// Rutas GET para diferentes colecciones
app.get("/Monstruos", async (req, res) => {
    try {
        const collection = await conectarMonstruosDB();
        const monstruos = await collection.find({}).toArray();
        res.json(monstruos);
    } catch (error) {
        console.error("Error al obtener los monstruos:", error);
        res.status(500).json({ error: "Error al obtener los datos de monstruos" });
    }
});

app.get("/Armas", async (req, res) => {
    try {
        const collection = await conectarArmasDB();
        const armas = await collection.find({}).toArray();
        res.json(armas);
    } catch (error) {
        console.error("Error al obtener las armas:", error);
        res.status(500).json({ error: "Error al obtener los datos de armas" });
    }
});

app.get("/Armaduras", async (req, res) => {
    try {
        const collection = await conectarArmadurasDB();
        const armaduras = await collection.find({}).toArray();
        res.json(armaduras);
    } catch (error) {
        console.error("Error al obtener las armaduras:", error);
        res.status(500).json({ error: "Error al obtener los datos de armaduras" });
    }
});

app.get("/User", async (req, res) => {
    try {
        const collection = await conectarUsuariosDB();
        const usuarios = await collection.find({}).toArray();
        res.json(usuarios);
    } catch (error) {
        console.error("Error al obtener los usuarios:", error);
        res.status(500).json({ error: "Error al obtener los datos de usuarios" });
    }
});

app.post("/User", async (req, res) => {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
        return res.status(400).json({ error: "Nombre y email son obligatorios." });
    }

    const nuevoUsuario = new User({
        nombre,
        email,
        rol: "Usuario",
    });

    try {
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: "Usuario creado con éxito" });
    } catch (error) {
        console.error("Error al crear el usuario:", error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});

// Escuchar en el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});