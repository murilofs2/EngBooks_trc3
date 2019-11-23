import Livros from '../models/Livros';
import Cleaner from 'text-cleaner';
import SW from 'stopword';

function cleanText (text) {
  const textoTratadoEN = SW.removeStopwords(text.split(' '),SW.en);
  const textoTratado = SW.removeStopwords(textoTratadoEN, SW.br);

  const textoLimpo = Cleaner(textoTratado).toLowerCase().valueOf();

  return textoLimpo;
}

class LivrosController {
  
  //GET
  async index (req,res) {
    const livroProcurado = req.body;
    let tituloEncontrado;
    let autorEncontrado;

    // Lista todos os livros cadastrados quando todos os parametros sao 'null'
    if (livroProcurado.titulo == null && livroProcurado.autor == null) {
      var todosLivros = await Livros.find();
      if (todosLivros.length == 0) {
        return res.status(404).json({ "error": "Nenhum livro cadastrado."});
      }
      else return res.status(200).json(todosLivros);
    }

    const tituloTratado = cleanText(livroProcurado.titulo);
    const autorTratado = cleanText(livroProcurado.autor);
  
    const tituloLimpo = Cleaner(tituloTratado).removeChars().valueOf();
    const autorLimpo = Cleaner(autorTratado).removeChars().valueOf();

    const tituloTags = tituloTratado.split(',');
    const autorTags = autorTratado.split(',');

    // Procura livro por titulo completo e autor completo
    tituloEncontrado = await Livros.findOne({ "titulolimpo": tituloLimpo });
    if (tituloEncontrado) return res.status(200).json(tituloEncontrado);
    
    autorEncontrado = await Livros.find({ "autorlimpo": autorLimpo });
    if (autorEncontrado.length !== 0) return res.status(200).json(autorEncontrado);

    // Procura livro por tags ou procura por autor (retorna todos os livros desse autor)
    tituloEncontrado = await Livros.find({ "titulotags": { $in: tituloTags } });
    autorEncontrado = await Livros.find({ "autortags": { $in: autorTags } });
  
    if (tituloEncontrado.length !== 0) return res.status(200).json(tituloEncontrado);
    if (autorEncontrado.length !== 0) return res.status(200).json(autorEncontrado);

    // Retorno caso o livro procurado não exista
    return res.status(404).json({ "error": "Livro procurado não existe." });
  }

  //POST
  async store (req,res) {
    const livroInserido = req.body;

    const tituloTratado = cleanText(livroInserido.titulo);
    const autorTratado = cleanText(livroInserido.autor);
  
    const tituloLimpo = Cleaner(tituloTratado).removeChars().valueOf();
    const autorLimpo = Cleaner(autorTratado).removeChars().valueOf();

    const tituloTags = tituloTratado.split(',');
    const autorTags = autorTratado.split(',');

    // Procura se o livro inserido já existe, se existir apenas atualiza a quantidade
    const tituloEncontrado = await Livros.findOne({ "titulolimpo": tituloLimpo });

    if (tituloEncontrado) {
      tituloEncontrado.quantidade += livroInserido.quantidade;
      tituloEncontrado.save();
      return res.status(200).json({ "message": `Quantidade de livros atualizada para ${tituloEncontrado.quantidade}.` });
    }

    // Se o livro não existir no banco de dados, cria um novo livro (trata se a requisição for mal feita)
    else {
      try {
        livroInserido.titulolimpo = tituloLimpo;
        livroInserido.autorlimpo = autorLimpo;
        livroInserido.titulotags = tituloTags;
        livroInserido.autortags = autorTags;
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
    const tituloTratado = cleanText(titulo);
    const tituloLimpo = Cleaner(tituloTratado).removeChars().valueOf();

    const livroEncontrado = await Livros.findOne({ "titulolimpo": tituloLimpo });
    if (!livroEncontrado) return res.status(404).json({ "error": "Livro não encontrado." });

    // Atualiza os dados do livro procurado
    livroEncontrado.autor = autor;
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
    const tituloTratado = cleanText(livroInserido.titulo);
    const tituloLimpo = Cleaner(tituloTratado).removeChars().valueOf();

    const livroProcurado = await Livros.findOne({ "titulolimpo": tituloLimpo });
    
    if (!livroProcurado) return res.status(404).json({ "error": "Livro não encontrado." });
    else await Livros.deleteOne(livroProcurado);

    return res.status(200).json({ "message": `Livro '${livroProcurado.titulo}' excluído com sucesso.` });
  }
}

export default new LivrosController();