import {NextFunction, Response} from 'express';
import IAuthController from 'controllers/IAuthController';
import { CustomRequest } from 'models/CustomRequest';

export default (authController: IAuthController) => (req: CustomRequest<any>, res: Response, next: NextFunction) => {
    if (['/api/login', '/api/signup'].includes(req.path)) {
        return next();
    }
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.sendStatus(403);
    }
    try {
        req.account = authController.checkToken(token);
        next();
    } catch (e) {
        res.sendStatus(403);
    }
};
