import AbstractController from 'controllers/AbstractController';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from 'models/CustomRequest';
import { CustomResponse } from 'models/CustomResponse';
import { AccountResponse } from '@woodstock/common/Responses';
import IDataController from 'controllers/IDataController';

class DataControllerImpl extends AbstractController implements IDataController {

    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        super();
        this.prisma = prismaClient;
    }

    async getAccountData(req: CustomRequest<any>, res: CustomResponse<AccountResponse>) {
        const accountId = req.account?.id;
        if (!accountId) {
            return this.sendError(res,403, 'Unauthorized');
        }
        const userData = await this.prisma.account.findUnique({ where: { id: accountId } })
    }

    async getAccountTransactions(req: CustomRequest<any>, res: CustomResponse<any>) {

    }

    async addAccountTransaction(req: CustomRequest<any>, res: CustomResponse<any>) {

    }

}

export default DataControllerImpl;
