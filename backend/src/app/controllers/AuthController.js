class AuthController {
  

    async authorize(req, res, next) {
      if(req.authenticated !== undefined){
         
        next()
      }else{
        return res.status(403).json({ "error": "Acesso Negado." });
      }
    }
  
 
}
  
  export default new AuthController();