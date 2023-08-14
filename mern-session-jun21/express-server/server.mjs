import express from "express";
import cors from "cors";
import "./loadEnviornment.mjs"
import db from "./db/conn.mjs";

const PORT = process.env.PORT || 4000
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));


function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

console.log(makeid(5));

app.post("/loginsalt", async (req,res) => {
    
    const username = req.body.username;
    console.log(username);
    
    

 let collection = await db.collection("profiles");
 let results = await collection.find({username: username});
 console.log(results); 
 results.forEach((document) => {

   let tempSalt = document.salt; 
   console.log(tempSalt);   
   res.send(tempSalt); 

   
 })
})


app.get("/salt", (req, res) => res.send(makeid(5)));

app.get("/", (req, res) => res.send("Hello, World!"));

app.post("/profile", async (req, res) => {
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
    salt: req.body.salt,
  };
  let collection = await db.collection("profiles");
  let result = await collection.insertOne(newUser);
  res.send(result).status(204);
});

app.post("/login", async (req,res) => {
     const username = req.body.username;
     const password = req.body.password;
     

  let collection = await db.collection("profiles");
  let results = await collection.find({username: username}).toArray();
  
  results.forEach((document) => {
    let tempPass = document.password;
    let tempSalt = document.salt;

    if (password === tempPass) {
      console.log("passwords match");
      res.send({loggedIn: true})
    } else {
      console.log("passwords dont match");
      res.send({ loggedIn: false })
    }
  })
})



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});