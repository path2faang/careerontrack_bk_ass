import express from 'express';
import envLoader from '../config/envLoader.js';
import appInitializer from './appInitializer.js';
import dbConnection from '../config/dbConnection.js';
import "../utils/passportService.js";

envLoader(); // Load Env


// Self Executing Function to autostart the app
(async () => {
    
    const app = express()

    const PORT = process.env.PORT || 4500 // default to 4500 else load from env

    appInitializer(app); //Load all required config before starting app

    await dbConnection() //connect to database

    app.listen(PORT, console.log(`Server is running on port http://localhost:${PORT}`))
})()