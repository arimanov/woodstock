import { Response } from 'express';

export default abstract class AbstractController {
    protected sendError(res: Response, code: number, error: string): Response<any, Record<string, any>> {
        return res.status(code).send({ error });
    }
}
