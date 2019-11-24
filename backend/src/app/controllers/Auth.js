import Login from '../models/Login';
import * as jwt from 'jsonwebtoken';
import {KEY} from '../../../common/security'


export const Authenticate = (req, res, next) => {
    
    const token = getToken(req)
    if(token){
        jwt.verify(token, KEY, function(err, decoded){
            if (err) return res.status(500).send({ auth: false, message: 'Falha ao autenticar token.' });
            if(decoded){
                Login.findOne({"username": decoded.sub}).then(user=>{
                    if(user){
                        
                        req.authenticated = user
                        req.userId = decoded.id;
                        next()
                    }
                });
            }
            // se tudo estiver ok, salva no request para uso posterior
            
        })
    } else{
        
        next()
    }
}


function getToken(req){
    const authorization = req.header('authorization')
    if(authorization){
        const parts = authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            return parts[1]
        }
    }
    return undefined
}


// Authorization: Bearer TOKEN
