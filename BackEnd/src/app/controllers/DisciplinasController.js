import Disciplina from '../models/Disciplina';

class DisciplinaController {
  //GET
  async index (req,res) {
    const todasDisciplinas = await Disciplina.find();

    if (todasDisciplinas.length == 0) return res.status(404).json({ "message": "Nenhuma disciplina cadastrada."});
    else return res.status(200).json(todasDisciplinas);
  }

  //POST
  async store (req,res) {
    const disciplinaInserida = req.body;
    const disciplinaProcurada = await Disciplina.findOne({ "código": disciplinaInserida.código });

    if (disciplinaProcurada) return res.status(200).json({"message": `Disciplina ${disciplinaProcurada.código} já foi cadastrada.`});
    else {
      try {
        const disciplinaCriada = await Disciplina.create(disciplinaInserida);
        if (!disciplinaCriada) return res.status(400).json({ "error": "Parâmetros do BODY faltando." });  
      }
      catch (err) {
        return res.status(400).json({ "error": "Parâmetros do BODY faltando." });
      }
    }

    return res.status(201).json(disciplinaInserida);
  }

  //PUT
  async update (req,res) {
    const código = req.params.codigo;
    const { nome, professor, departamento } = req.body;
    
    const disciplinaProcurada = await Disciplina.findOne({ "código": código });
    if (!disciplinaProcurada) return res.status(404).json({ "error": "Disciplina não encontrada." });

    disciplinaProcurada.nome = nome;
    disciplinaProcurada.professor = professor;
    disciplinaProcurada.departamento = departamento;
    disciplinaProcurada.save();

    return res.status(200).json( { "message": "Disciplina atualizada.", disciplinaProcurada });
  }

  //DELETE
  async destroy (req,res) {
    const código = req.params.codigo;

    const disciplinaProcurada = await Disciplina.findOne({ "código": código });
    if (!disciplinaProcurada) return res.status(404).json({ "error": "Disciplina não encontrada." });

    await Disciplina.deleteOne({ "código": código});

    return res.status(200).json({ "message": `Disciplina ${código} excluída com sucesso.` });
  }
}

export default new DisciplinaController();