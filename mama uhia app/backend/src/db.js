import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB_NAME || 'mama_uhai';

const client = new MongoClient(uri);
let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(dbName);
    console.log(`Connected to MongoDB at ${uri} using database ${dbName}`);
  }
  return db;
}

export { connect };
