import mongoose from "mongoose";
mongoose.set('strictQuery', false);  
const connection = async (username,password)=>{
  
  var clusterUrl ='mongodb+srv://' + username + ':' + password + '@cluster0.cyon8g8.mongodb.net/?retryWrites=true&w=majority';
  try{
      
      console.log(clusterUrl);
      await mongoose.connect(clusterUrl);
      console.log("database connected succesasfully");
  }
   catch(error)
   {
     console.log("Error while connecting to database ", error);
   }
}
export  default connection;