import mongoose from 'mongoose';
import conn from '../../config/dbConnection';

mongoose.connect(conn.url);

const LivrosSchema = new mongoose.Schema ({
  titulo: {
    type: String,
    required: true,
  },
  titulolimpo: {
    type: String,
  },
  titulotags: {
    type: Array,
  },
  autor: {
    type: String,
    required: true,
  },
  autorlimpo: {
    type: String,
  },
  autortags: {
    type: Array,
  },
  assunto: {
    type: String,
    required: true,
  },
  ano: {
    type: Number,
    required: true,
  },
  idioma: {
    type: String,
    required: true,
  },
  quantidade: {
    type: Number,
    required: true
  }
});

export default mongoose.model("Livros", LivrosSchema);