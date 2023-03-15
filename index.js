import express from "express"
import { MongoClient, ObjectId } from "mongodb";
import cors from "cors";
import * as dotenv from 'dotenv';

dotenv.config()

let app = express()
let port = process.env.port
let client = new MongoClient(process.env.url);
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Server is running Sucessfully 🎉💥")
})

app.get("/movies", async (req, res) => {

    let dt = await client.db("movie").collection("movie").find({}).toArray()
    res.send(dt)


})


app.get("/movies/:id", async (req, res) => {
    const { id } = req.params;
    let movieData = await client.db("movie").collection("movie").findOne({ _id: new ObjectId(id) })
    console.log(movieData);

    movieData ? res.send(movieData) : res.send("Sorry Page Not Found")

});

// post with node and mongo.

app.post("/movies/add", async (req, res) => {
    let data = req.body
    await client.db("movie").collection("movie").insertOne(data)
    res.send("sucess")
})

//  Delete methos using Express.

app.delete("/movies/:id", async (req, res) => {
    let { id } = req.params;

    let del = await client.db("movie").collection("movie").deleteOne({ _id: new ObjectId(id) })

    res.send(del)
})

// put method using express

app.put("/movies/edit/:id", async (req, res) => {
    let { id } = req.params;
    let data = req.body
    let pt = await client.db("movie").collection("movie").updateOne({ _id: new ObjectId(id) }, { $set: data })
    res.send(pt)
    console.log(data)
})

app.listen(port, () => {
    console.log("Server is running on " + "http://localhost:" + port);
})
