import express from 'express';      // ES module 
const app = express();
import routes from './routes/index.js'
import my_events from './events/events.js'
import './config/mongo.config.js' 
import cors from 'cors' ;

const corsOptions = {
    // * => allowing access to all the urls or origins
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, // Enable credentials (e.g., cookies, authorization headers)
    optionsSuccessStatus: 204
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

app.use('/assests', express.static(process.cwd()+'/uploads'));

// events middleware
app.use(my_events);


// data parsing middleware: converting to requset

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Mounting the routes
// app.use(routes);
app.use('/', routes)

const port = process.env.PORT || 4000;

app.use((req, res, next) => {
    next({
        status_code : 404,
        msg: "Resource Not Found",
    })
})

// Error Handling Middleware
app.use((error, req, res, next) => {
    console.log("Error: " ,error);  
    let status = error.status_code || 500;
    let msg = error.msg || JSON.stringify(error);
    res.status(status).json({
        result: null,
        msg: msg,
        status: false
    })
})


// deployment : port set up for live server
app.listen(process.env.PORT || 80);

// Start the server in local server
// app.listen(port, 'localhost', (err) => {
//     if (err) {
//         console.log(`Error listening on port no. ${port}`);
//     } else {
//         console.log(`Server is running on port no. ${port}`);
//         console.log("Press CTRL + C to close the Server Call");
//     }
// })
