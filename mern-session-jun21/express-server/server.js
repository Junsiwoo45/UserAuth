const express = require("express");
var session = require("express-session");
var MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const bodyParser = require("body-parser");



const app = express();

const tempPass = "";
// This helps us so that the react server can talk with and utilize
// the same sessions as the express server
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.json());
// Store the cookie session info in Mongo
var store = new MongoDBStore({
    uri: 'mongodb+srv://haydendickson:haydendickson@may22.xnqyotw.mongodb.net/?retryWrites=true&w=majority',
    databaseName: 'sample_training',
    collection: 'records'
});

store.on("error", function (error) {
  console.log("Error connecting to the session store: " + store);
});

app.use(
  session({
    secret: "keyboard cat",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// routes
app.get("/", (req, res) => res.send("Hello, World!"));

app.post("/profile", (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;
  const salt = req.body.salt;
  let newUser = {
    username: req.body.username,
    password: req.body.password,
    type: req.body.type,
    salt: req.body.salt,
  };
  console.log(JSON.stringify(username));
  console.log(JSON.stringify(password));
  console.log(JSON.stringify(type));
  console.log(JSON.stringify(salt));
  req.session.username = username;
  req.session.password = password;
  req.session.type = type;
  req.session.salt = salt;
  console.log(JSON.stringify(username));
  console.log(JSON.stringify(password));
  console.log(JSON.stringify(type));
  console.log(JSON.stringify(salt));

  req.session.save(function (err) {
    if (err) {
      console.log("Error saving session");
    } else {
      console.log("The session is now: " + JSON.stringify(req.session));
      // If the server saved everything correct, send loggedIn to user
      res.send(
        JSON.stringify({
          username: req.session.username,
          password: req.session.password,
          type: req.session.type,
          salt: req.session.salt
        })
      );
    }
  });
});
app.put("/updateLoggedIn", async (req, res) => {
  try {
    const { username } = req.body;
    const { loggedIn } = req.body;

    // Find the first document that matches the username and update the loggedIn field
    const updatedDocument = await YourCollection.findOneAndUpdate(
      { username },
      { loggedIn },
      { new: true }
    );

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, can't update loggedIn" });
  }
});
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const type = req.body.type;
  const salt = req.body.salt;
 
 

    console.log(JSON.stringify(password));
    console.log(JSON.stringify(req.session.password));
    console.log(JSON.stringify(username));
    console.log(JSON.stringify(req.session.username));

    
    console.log(JSON.stringify("made it here"));

  req.session.save(function (err) {
    if (err) {
      console.log("Error saving session");
    } else {
      console.log("The session is now: " + JSON.stringify(req.session));
      // If the server saved everything correct, send loggedIn to user
      res.send(
        JSON.stringify({
          username: req.session.username,
          password: req.session.password,
          type: req.session.type,
          salt: req.session.salt,
          
        })
      );
    }
  });
});




app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});
