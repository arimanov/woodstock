import { Request, Response } from 'express';
import jwt, {Secret} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient, Prisma } from '@prisma/client';
import AbstractController from 'controllers/AbstractController';
import { CustomRequest } from 'models/CustomRequest';
import { CustomResponse } from 'models/CustomResponse';
import TokenContent from 'models/TokenContent';
import { LoginRequest, SignUpRequest } from '@woodstock/common/Requests';
import { LoginResponse, SignUpResponse } from '@woodstock/common/Responses';
import IAuthController from 'controllers/IAuthController';

class AuthControllerImpl extends AbstractController implements IAuthController {

  private prisma: PrismaClient;
  private readonly keyString: Secret;

  readonly NOT_UNIQ_ACCOUNT_CODE = 'P2002';

  constructor(prismaClient: PrismaClient, keyString: Secret) {
    super();
    this.prisma = prismaClient;
    this.keyString = keyString;
  }

  async login(req: CustomRequest<LoginRequest>, res: CustomResponse<LoginResponse>) {
    const { email, password } = req.body;
    const existingUser = await this.prisma.account.findUnique({ where: { email } })

    if (!existingUser
        || !existingUser.id
        || !existingUser.email
        || !await bcrypt.compare(password, existingUser.password)) {
      return this.sendError(res,401, 'Unauthorized');
    }

    const loginResponse: LoginResponse = {
      token: this.generateToken(existingUser.id, existingUser.email),
      tokenType: 'Bearer',
    };

    return res.json(loginResponse);
  }

  async signup(req: CustomRequest<SignUpRequest>, res: CustomResponse<SignUpResponse>) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return this.sendError(res, 400, 'Incorrect request, missing field name, email or password');
    }
    try {
      const data = await this.prisma.account.create({ data: {
          email,
          name,
          password: await bcrypt.hash(password, 1),
          createdAt: new Date(),
        }
      });
      const createdResponse: SignUpResponse = {
        id: data.id,
        createdAt: data.createdAt.toISOString(),
        token: this.generateToken(data.id, data.email),
      };
      return res.json(createdResponse);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === this.NOT_UNIQ_ACCOUNT_CODE) {
          return this.sendError(res, 400, 'New user cannot be created with this email');
        }
      }
      else {
        return this.sendError(res, 500, 'Unknown error');
      }
    }
  }

  checkToken(token: string): TokenContent {
    const tokenContent = jwt.verify(token, this.keyString) as TokenContent;
    if (!tokenContent.id || !tokenContent.email) {
      throw Error('Incorrect token payload');
    }
    return tokenContent;
  }

  private generateToken(id: number, email: string): string {
    const tokenContent: TokenContent = { id, email };
    return jwt.sign(tokenContent, this.keyString, { expiresIn: '8h' });
  }

}

export default AuthControllerImpl;
