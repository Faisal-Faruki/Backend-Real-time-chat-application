// import { MongoClient } from "mongodb";

// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     const db = client.db("streamfy");
//     const users = db.collection("users");

//     const result = await users.insertOne({ name: "Ali", age: 30 });
//     console.log("User inserted:", result.insertedId);
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.error);
