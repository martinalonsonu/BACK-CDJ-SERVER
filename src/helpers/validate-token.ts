import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HandleError, handleServiceError } from './handlerController';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    //Obtención de la cabecera de la petición
    const headerToken = req.headers.authorization
    if (headerToken && headerToken.startsWith('Bearer ')) {
        try {
            //Obtenemos el token después del Bearer            
            const token = headerToken.split(' ')[1]
            if (!token || token.length === 0) throw new HandleError(401, "Unauthorized");
            jwt.verify(token, process.env.SECRET_KEY || 'cdj123', (err, user) => {
                if (err) throw new HandleError(401, "Unauthorized");
                req.user = user;
                next() //Continúa al controller
            })
        } catch (error) {
            handleServiceError(error, res)
        }
    } else {
        res.status(401).json({
            message: 'Access denied'
        })
    }
}

export default validateToken;

