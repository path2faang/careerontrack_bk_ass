import mongoose from "mongoose";
import fs from 'fs';


const errorMessage = (error) => {
    if(error?.message || error?.stack) {
        //log file
    }
}


(async () => {
    try {

        //check if the file exist
        if(!fs.existsSync("logs")) {
            fs.mkdirSync("logs")
        }
    } catch (error) {
        console.log(`Error occurred: ${error}`)
    }
})();

export default (error, req, res, next) => {
    //handle all errors
    // log them

    console.log(error)

    if (error instanceof mongoose.Error.ValidationError) {
        //extract the error
        const validationErrors = Object.values(error.errors).map(err => err.message);

        return res.status(400).json({
            success: false,
            message: validationErrors,
        })
    }

    if(error instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            success: false,
            message: error.message,
        }) 
    }

    // DuplicateKeyError handling (error code 11000)
    if (error.code && error.code === 11000) {
        const duplicatedField = Object.keys(error.keyValue)[0];
        return res.status(400).json({
            success: false,
            message: `${duplicatedField} already exist`
        });
    }

    // If it's any other error
    return res.status(400).json({
        success: false,
        message: error.message
    });
}