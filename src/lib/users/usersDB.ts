import { InsertOneResult } from "mongodb";
import { db } from "../../db";
import { User } from "./models";

const UsersDB = {
  async saveUser(user: User): Promise<InsertOneResult<Document> | Error> {
    try {
      let users = db.collection('users');
      if (users === undefined) {
        console.log('users collection is undefined');
        await db.createCollection('users');
        users = db.collection('users');
      }
      console.log('users collection =>', users);
      const result = await users.insertOne(user);
      console.log('result =>', result);
      return result;
    } catch (e) {
      const err = e as Error;
      console.log(err);
      return err;
    }
  },
};

export default UsersDB;