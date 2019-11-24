import Login from '../models/Login';
import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import {KEY} from '../../../common/security'
class LoginController {
  
  //GET
  async index (req,res) {
    let loginInfo = req.body;

    const usernameCheck = await Login.findOne({ "username": loginInfo.username });
    if (!usernameCheck) return res.status(404).json({ "error": "Usuário não está cadastrado." });

    await bcrypt.compare(loginInfo.password,usernameCheck.password).then((check) => {
      if (check){
        const token = jwt.sign({sub: loginInfo.username, iss:'engbooks'}, KEY)
        return res.status(200).json({name: loginInfo.username, accessToken: token});} 
      else return res.status(404).json({ "error": "Senha inválida." });
    }); 
  }

  //POST
  async store (req,res) {
    let loginInfo = req.body;

    const usernameCheck = await Login.findOne({ "username": loginInfo.username });
    if (usernameCheck) return res.status(200).json({ "message": "Usuário já está cadastrado." });

    await bcrypt.hash(loginInfo.password, 10).then((hash) => {
      loginInfo.password = hash;
    });

    try {
      const loginCriado = await Login.create(loginInfo);
      if (loginCriado) return res.status(200).json(loginCriado);
    }
    catch (err) {
      return res.status(400).json({ "error": "Parâmetros do BODY faltando." });
    }
  }

  //PUT
  async update (req,res) {
    
  }
}

export default new LoginController();