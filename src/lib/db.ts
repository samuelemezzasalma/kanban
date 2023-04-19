import mongoose, { Connection, type ConnectOptions } from "mongoose";
import { boardSchema } from "./mongoose/schemas";



// Connection URI
export const URI = 'mongodb://sam:password@localhost:27017/';
export const OPTIONS: ConnectOptions = { authSource: "admin", maxPoolSize: 10 }
// Create a new MongoClient
let conn: typeof mongoose.connection;
// const client = new MongoClient(uri, {authSource:"admin"
export function getConn(uri?: string, options?: ConnectOptions): Connection {
  try {
    if (uri) {
      conn = mongoose.createConnection(uri, options);
    } else {
      if (!conn) {
        conn = mongoose.createConnection(URI, OPTIONS);
      }
    }
    return conn;
  } catch (error) {
    console.error(error);
    return mongoose.createConnection()
  }
}

export const newConnection = () => {
  return mongoose.createConnection(URI, OPTIONS);
}

export function init_db() {
  console.log("Starting mongo database initialization...")

  const BoardModel = conn.model('Board', boardSchema)

  const myBoard = new BoardModel({
    title: "My Board",
    swimlanes: [
      {
        title: "My Lane",
        cards: [
          {
            title: "My Card"
          }
        ]
      }
    ]
  })

  /* const myBoard = new Board({
    title: "My Board",
    swimlanes: [
      {
        title: "My Lane",
        cards: [
          {
            title: "My Card"
          }
        ]
      }
    ]
  }) */
  myBoard.save().then(() => {
    console.log("Mongo database initialized!");
  })
}


export async function pingMongo(mg: typeof mongoose) {
  try {
    console.log(mg.STATES[mongoose.connection.readyState]);

  } finally {
    // Ensures that the client will close when you finish/error
    await mg.connection.close();
  }
}

/* export async function pingDB() {
  try {
    console.log(uri)
    // Connect the client to the server (optional starting in v4.7)
    await db.connect();
    // Establish and verify connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    console.log(uri)
    // Ensures that the client will close when you finish/error
    await client.close();
  }
} */

// export default client.db('dealership') // select database