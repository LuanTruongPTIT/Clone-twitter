require('dotenv').config();
const mongoose = require('mongoose')
const connection = async () => {
  try {
    const options = { dbName: process.env.DB_DATABASE }
    await mongoose.connect("mongodb+srv://n19dcat047:0822036246@cluster0.vtqvvig.mongodb.net/test?authSource=Cluster0&authMechanism=SCRAM-SHA-1", options, { useNewUrlParser: true });
    console.log("Ket noi thanh cong")
  } catch (error) {
    console.log(error)
  }
}
module.exports = connection
