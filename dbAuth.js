import mongoose from 'mongoose';




export const connectDB = () => {

    try{
        mongoose.connect(
            "mongodb+srv://harigovind3020:bgIoTHKeInOBaFIP@cluster0.u5yuznl.mongodb.net/jobportaldb?retryWrites=true&w=majority"
          );
    }
    catch(e){
        console.log(`Error connecting to DB -> ${e}`)
    }

}
