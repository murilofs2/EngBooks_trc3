import Livros from '../models/Livros';
import Cleaner from 'text-cleaner';
import SW from 'stopword';

function cleanText (text) {
  const textoTratadoEN = SW.removeStopwords(text.split(' '),SW.en);
  const textoTratadoBR = SW.removeStopwords(textoTratadoEN, SW.br);

  return Cleaner(textoTratadoBR).toLowerCase().removeChars().valueOf();
}

class LivrosController {

  //GET
  async index (req,res) {
    const livroProcurado = req.body;
    const tituloLimpo = cleanText(livroProcurado.titulo);
    const autorLimpo = cleanText(livroProcurado.autor);

    // Lista todos os livros cadastrados quando todos os parametros sao 'null'
    if (livroProcurado.titulo == null && livroProcurado.autor == null) {
      var todosLivros = await Livros.find();
      if (todosLivros.length == 0) {
        return res.status(404).json({ "error": "Nenhum livro cadastrado."});
      }
      else return res.status(200).json(todosLivros);
    }

    // Lista um livro específico ou procura por autor (retorna todos os livros desse autor)
    else {
      var livroEncontrado;
      const tituloEncontrado = await Livros.findOne({ "titulolimpo": tituloLimpo });
      const autorEncontrado = await Livros.find({ "autorlimpo": autorLimpo });

      if (tituloEncontrado) livroEncontrado = tituloEncontrado;
      else livroEncontrado = autorEncontrado;
      
      if (livroEncontrado) {
        return res.status(200).json(livroEncontrado);
      }
    }

    // Retorno caso o livro procurado não exista
    return res.status(404).json({ "error": "Livro procurado não existe." });
  }

  //POST
  async store (req,res) {
    const livroInserido = req.body;
    const tituloLimpo = cleanText(livroInserido.titulo);
    const autorLimpo = cleanText(livroInserido.autor);

    // Procura se o livro inserido já existe, se existir apenas atualiza a quantidade
    const livroEncontrado = await Livros.findOne({ "titulolimpo": tituloLimpo, "autor": autorLimpo });
    if (livroEncontrado) {
      livroEncontrado.quantidade += livroInserido.quantidade;
      livroEncontrado.save();
      return res.status(200).json({ "message": `Quantidade de livros atualizada para ${livroEncontrado.quantidade}.` });
    }

    // Se o livro não existir no banco de dados, cria um novo livro (trata se a requisição for mal feita)
    else {
      try {
        livroInserido.titulolimpo = tituloLimpo;
        livroInserido.autorlimpo = autorLimpo;
        const livroCriado = await Livros.create(livroInserido);
        if (livroCriado) return res.status(200).json({ "message": "Livro criado.", livroCriado});
      }
      catch (err) {
        return res.status(400).json({ "error": "Parâmetros do BODY faltando." });
      }
    }
  }

  //PUT
  async update (req,res) {
    const { codigo, titulo, autor, assunto, ano, idioma, quantidade } = req.body;
    
    // Procura se o livro a ser atualizado existe
    const tituloLimpo = cleanText(titulo);
    const livroEncontrado = await Livros.findOne({ "titulolimpo": tituloLimpo });
    if (!livroEncontrado) return res.status(404).json({ "error": "Livro não encontrado." });

    // Atualiza os dados do livro procurado
    livroEncontrado.codigo = codigo;
    livroEncontrado.titulo = titulo;
    livroEncontrado.titulolimpo = cleanText(livroEncontrado.titulo);
    livroEncontrado.autor = autor;
    livroEncontrado.autorlimpo = cleanText(livroEncontrado.autor);
    livroEncontrado.assunto = assunto;
    livroEncontrado.ano = ano;
    livroEncontrado.idioma = idioma;
    livroEncontrado.quantidade = quantidade;
    livroEncontrado.save();

    return res.status(200).json({ "message": "Livro atualizado.", livroEncontrado });
  }

  //DELETE
  async destroy (req,res) {
    const livroInserido = req.body;
    const tituloLimpo = cleanText(livroInserido.titulo);

    const livroProcurado = await Livros.findOne({ "titulolimpo": tituloLimpo });
    
    if (!livroProcurado) return res.status(404).json({ "error": "Livro não encontrado." });
    else await Livros.deleteOne(livroProcurado);

    return res.status(200).json({ "message": `Livro '${livroProcurado.titulo}' excluído com sucesso.` });
  }
}

export default new LivrosController();