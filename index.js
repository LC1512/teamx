// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');

//connection establish through mongoclient using nodejs and object destructure
const { MongoClient,ObjectId} = require('mongodb');

// Creating an Express application
const app = express();
app.use(bodyParser.json());

// Mongodb connection string
const uri = 'mongodb://127.0.0.1:27017/zerozoner';

//connection estalishment
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect().then(() => {
  console.log("Connection established");

  let db = client.db();
  //
  const usersCollectionName = "users";

  // Access the "users" collection
  //const  is used because there is no need to change values
  const userCollection = db.collection(usersCollectionName);

  // Insert a user document into users
  userCollection.insertOne({
    name: 'chaithu',
    phone: '0987654321',
    role: 'Freelancer',
    email: "chaithu@gmail.com",
  }).then(() => { 
    // Access the "projects" collection
    const projectsCollection = db.collection('projects');

    // Insert a project document into projects collection
    //return statement is useful return the insertone method
    return projectsCollection.insertOne({
      name: "zerozoner",
      description: "Description of Project XYZ",
      file: "C:/Users/THRIVEDH/Downloads/CHAITHU/teamx"//here we forwardslashes to overcome problem of escape character

    });
  }).then(() => {

    // Access the "user_wallets" collection
    const userWalletsCollection = db.collection('user_wallets');

    // Insert a user_wallets document into user_wallet collection 
    return userWalletsCollection.insertOne({
      user_id:new ObjectId(),
      balance: 1000.00,
      account_details: "Account details here",
      payment_gateway_info: "Payment gateway info here"
    });
  }).then(() => {
    // Access the "user_transactions" collection
    const userTransactionsCollection = db.collection('user_transactions');

    // Insert a user_transactions document into user_transaction collection
    
    return userTransactionsCollection.insertOne({
      user_id:new ObjectId(),
      project_id:new ObjectId(),
      transaction_type: "debit", // or "credit"
      payment_mode: "Cash",
      amount: 500.00,
      transaction_date: new Date("2024-01-24T00:00:00Z")
    });
  }).then(() => {
    console.log("Inserted");//if data insertion sucessfull then this message is executed
    client.close();
  }).catch(error => {
    console.error('Error inserting data:', error);//if there an error during insertion then this message executed
    client.close();
  });
});

 //Starting the Express server on port 3000
 app.listen(3000, () => {
   console.log("Server running on port 3000");
 });
