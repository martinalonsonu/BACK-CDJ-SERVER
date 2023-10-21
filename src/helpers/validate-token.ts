import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    //Obtención de la cabecera de la petición
    const headerToken = req.headers['authorization']
    if (headerToken !== undefined && headerToken.startsWith('Bearer ')) {
        try {
            //Obtenemos el token después del Bearer
            const token = headerToken.slice(7)
            jwt.verify(token, process.env.SECRET_KEY || 'cdj123') //Verificar el token
            next() //Continúa al controller
        } catch (error) {
            res.status(401).json({
                message: 'Invalid token'
            })
        }
    } else {
        res.status(401).json({
            message: 'Access denied'
        })
    }
}

export default validateToken;

