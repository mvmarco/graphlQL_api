const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const basicAuth = require("express-basic-auth");
dotenv.config();
 const cors = require("cors");


const app = express();
const graphQLSchema = require("./graphql/schema/index.cjs");
const graphQLResolvers = require("./graphql/resolvers/index.cjs");

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// app.use(
//   basicAuth({
//     users: { admin: "2MuchSecurity!?" },
//   })
// );

////////////////////////////////////////// MARCO
app.use(cors());
app.get("/", function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.status(200).send({
    status: "success",
    data: "lol",
  });
});

//////////////////////////////////////////
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQLSchema,
    rootValue: graphQLResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@arkyn-ir.ey98y.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(8080);
    console.log("FREDERIK APP RUNNING at 8080");
  })
  .catch((err) => {
    console.log(err);
  });
