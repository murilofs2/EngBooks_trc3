import mongoose from 'mongoose';
import conn from '../../config/dbConnection';

mongoose.connect(conn.url);

const LivrosSchema = new mongoose.Schema ({
  codigo: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  titulolimpo: {
    type: String,
  },
  autor: {
    type: String,
    required: true,
  },
  autorlimpo: {
    type: String,
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