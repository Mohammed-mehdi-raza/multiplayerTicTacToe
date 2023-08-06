import mongoose from "mongoose";
import 'dotenv/config';

const URI=process.env.MONGO_URI;
mongoose.set("strictQuery", false);

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection to database successful');
}).catch((e) => {
    console.log(`not connected due to error ${e}`);
    console.log(`URI=${process.env}`);
});