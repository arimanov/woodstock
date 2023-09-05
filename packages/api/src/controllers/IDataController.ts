import { CustomRequest } from 'models/CustomRequest';
import { CustomResponse } from 'models/CustomResponse';
import { AccountResponse } from '@woodstock/common/Responses';

export default interface IDataController {
    getAccountData(req: CustomRequest<any>, res: CustomResponse<AccountResponse>): void,
    getAccountTransactions(req: CustomRequest<any>, res: CustomResponse<>): void,
    addAccountTransaction(req: CustomRequest<>, res: CustomResponse<>): void,
}
