const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag"); //This installs with apollo server
const mongoose = require("mongoose"); //This is a ORM library  which helps us interface with mongoDB database
const { MONGO_DB } = require("./config");
//type definition where we write our graphql type
const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;
//In graphql, the ! is use to indicate that the field is required

//These resolvers serves as the logic which works behind the type definitions to output the required results
const resolvers = {
  // there is the need to group queries on one side and mutations on the other
  Query: {
    sayHi: () => "Hello World",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
//connecting to the database using mongoose
// mongoDB is schemaless but with mongoose we can specify a schema
mongoose
  .connect(MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database is connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server is running on ${res.url}`);
  })
  .catch((err) => {
    console.log(err);
  });

//This Apollo Server has express in built
