import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { LoginRequest, SignUpRequest } from '@woodstock/common/Requests';
import { LoginResponse, SignUpResponse } from '@woodstock/common/Responses';
import { CustomRequest } from 'models/CustomRequest'
import { CustomResponse } from 'models/CustomResponse';
import AuthControllerImpl from 'controllers/AuthControllerImpl';
import AuthMiddleware from 'middlewares/AuthMiddleware';

const app = express()
const port = 8080;
app.use(express.json());

const { SECRET_KEY } = process.env;

const prisma = new PrismaClient();
const authController = new AuthControllerImpl(prisma, SECRET_KEY || '');

app.use(AuthMiddleware(authController));

app.post('/api/login', (req: CustomRequest<LoginRequest>, res: CustomResponse<LoginResponse>) =>
    authController.login(req, res));

app.post('/api/signup', (req: CustomRequest<SignUpRequest>, res: CustomResponse<SignUpResponse>) =>
    authController.signup(req, res));

app.get("/api/account", async (req: CustomRequest<any>, res) => {
  console.log(req.account);
  res.send({});
});

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});
