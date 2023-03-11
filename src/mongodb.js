const express = require('express')
const app = express()
const mongoose = require('mongoose')


const connectionURL = 'mongodb+srv://n19dcat047:0822036246@cluster0.vtqvvig.mongodb.net/test?authSource=Cluster0&authMechanism=SCRAM-SHA-1'
const database = 'bookstore'
const connect = async () => {
  try {
    const options = { dbName: process.env.DB_DATABASE }
    await mongoose.connect("mongodb+srv://n19dcat047:0822036246@cluster0.vtqvvig.mongodb.net/test?authSource=Cluster0&authMechanism=SCRAM-SHA-1", options, { useNewUrlParser: true })
    console.log("ket noi thanh cong ")
  } catch (error) {
    console.log(error)
  }
}
connect();
