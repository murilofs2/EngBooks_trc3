import mongoose from 'mongoose';
import conn from '../../config/dbConnection';

mongoose.connect(conn.url);

const DisciplinaSchema = new mongoose.Schema ({
  código: {
    type: String,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  professor: {
    type: String,
    required: true,
  },
  departamento: {
    type: String,
    required: true,
  }
});

export default mongoose.model("Disciplina", DisciplinaSchema);