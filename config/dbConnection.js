import mongoose from 'mongoose';

export default () => mongoose.connect(process.env.DB_URL)
    .then(onFulfill => console.log(`Mongo Database is connected successfully`))
    .catch(onRejected => console.log(`Failed to Connect to MongoDb: ${onRejected}`))