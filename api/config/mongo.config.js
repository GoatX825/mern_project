import mongoose from "mongoose";
import { DB_NAME, DB_URL } from "./db.config.js";

// let connUrl = DB_URL + '/' + DB_NAME;

let connUrl = "mongodb+srv://GoatX:MMRoD0IYStYtzNA5@goatx.d0bkhls.mongodb.net/mern-9?retryWrites=true&w=majority";

mongoose.connect(connUrl, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("Successfully connected to DB");
})
.catch((err) => {
    console.log("Error: ", err);
})

// connection through atlas - using cluster goatX ==> GoatX is username and MMRoD0IYStYtzNA5 is auto-generated password
// let connUrl = "mongodb+srv://GoatX:MMRoD0IYStYtzNA5@goatx.d0bkhls.mongodb.net/mern-9?retryWrites=true&w=majority";