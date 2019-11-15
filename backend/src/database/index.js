import mongoose from 'mongoose';
import conn from '../config/dbConnection';

class Database {
  constructor () {
    this.mongo();
  }

  mongo () {
    this.mongoConnection = mongoose.connect(conn.url);
  }
}

export default new Database();
