import mongoose from 'mongoose';
import conn from '../../config/dbConnection';

mongoose.connect(conn.url);

const LoginSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Login", LoginSchema);