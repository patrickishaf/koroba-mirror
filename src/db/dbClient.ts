import { type Db, MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

let db: Db;

const dbClient: MongoClient = new MongoClient(process.env.DB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  pkFactory: {
    createPk: () => uuidv4(),
  }
});

export const connectToDb = async () => {
  try {
    await dbClient.connect();
    db = dbClient.db('admin');
    await db.command({ ping: 1 });
    console.log("pinged the db successfully");
  } catch (e) {
    console.dir(e);
  } finally {
    process.on('beforeExit', async () => {
      console.log('the db client is closing');
      await dbClient.close();
    })
  }
}

export default db;