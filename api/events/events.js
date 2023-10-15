import events from 'events';
import express from 'express';

const app = express();

// myEvents Object
const myEvents = new events.EventEmitter();

app.use((req, res, next) => {
    req.myEvents = myEvents;
    next();
})

// listening events
myEvents.on('register', (data) => {
    console.log(data);
    console.log("I am in register!");
})

myEvents.on('cart', (data) => {
    console.log(data);
    console.log("I am in cart!");
})

export default app;