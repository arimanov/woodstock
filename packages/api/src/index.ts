import express from "express"
import { Account } from "@woodstock/common/Account";

const app = express();
const port = 8080; // default port to listen

const x:Account = {
    id: "1",
    createdAt: "",
};

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );
