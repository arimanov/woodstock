import { Request } from 'express';
import ReadableStream = NodeJS.ReadableStream;
import TokenContent from "models/TokenContent";

export interface CustomRequest<T> extends Request {
    body: T,
    account?: TokenContent,
    pause(): this,
    resume(): this,
    unpipe(): this,
    wrap(readableStream: ReadableStream): this,
    setEncoding(bufferEncoding: BufferEncoding): this,
}
