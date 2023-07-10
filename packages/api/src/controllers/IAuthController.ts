import TokenContent from 'models/TokenContent';
import { CustomRequest } from 'models/CustomRequest';
import { CustomResponse } from 'models/CustomResponse';
import { LoginRequest, SignUpRequest } from '@woodstock/common/Requests';
import { LoginResponse, SignUpResponse } from '@woodstock/common/Responses';

export default interface IAuthController {
    checkToken(token: string): TokenContent,
    login(req: CustomRequest<LoginRequest>, res: CustomResponse<LoginResponse>): void,
    signup(req: CustomRequest<SignUpRequest>, res: CustomResponse<SignUpResponse>): void,
}
