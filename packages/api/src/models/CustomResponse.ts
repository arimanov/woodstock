import { Response } from 'express';
import { Send } from 'express-serve-static-core';

export interface CustomResponse<T> extends Response {
    json: Send<T, this>,
    end(),
}
