import { DerivAPIBasic } from '@deriv/deriv-api/dist/DerivAPIBasic';
import { DERIV_API_CONFIG, API_ENDPOINTS } from '../config/deriv-api';

class DerivAPIService {
    constructor() {
        this.connection = null;
        this.isConnected = false;
        this.token = null;
    }

    async connect() {
        try {
            this.connection = new DerivAPIBasic({ app_id: DERIV_API_CONFIG.app_id });
            await this.connection.connect();
            this.isConnected = true;
            return true;
        } catch (error) {
            console.error('Failed to connect to Deriv API:', error);
            return false;
        }
    }

    async authorize(token) {
        try {
            if (!this.isConnected) {
                await this.connect();
            }
            const response = await this.connection.send({ authorize: token });
            if (response.error) {
                throw new Error(response.error.message);
            }
            this.token = token;
            return response;
        } catch (error) {
            console.error('Authorization failed:', error);
            throw error;
        }
    }

    async buyContract(params) {
        try {
            const response = await this.connection.send({
                buy: 1,
                ...params,
            });
            return response;
        } catch (error) {
            console.error('Failed to buy contract:', error);
            throw error;
        }
    }

    async sellContract(contract_id) {
        try {
            const response = await this.connection.send({
                sell: contract_id,
                price: 0,
            });
            return response;
        } catch (error) {
            console.error('Failed to sell contract:', error);
            throw error;
        }
    }

    async getStatement(params) {
        try {
            const response = await this.connection.send({
                statement: 1,
                ...params,
            });
            return response;
        } catch (error) {
            console.error('Failed to get statement:', error);
            throw error;
        }
    }

    async getBalance() {
        try {
            const response = await this.connection.send({ balance: 1 });
            return response;
        } catch (error) {
            console.error('Failed to get balance:', error);
            throw error;
        }
    }

    async getCashierInfo() {
        try {
            const response = await this.connection.send({ cashier: 1 });
            return response;
        } catch (error) {
            console.error('Failed to get cashier info:', error);
            throw error;
        }
    }

    async getCashierPayments() {
        try {
            const response = await this.connection.send({ cashier_payments: 1 });
            return response;
        } catch (error) {
            console.error('Failed to get cashier payments:', error);
            throw error;
        }
    }

    async requestWithdrawal(params) {
        try {
            const response = await this.connection.send({
                cashier_withdrawal: 1,
                ...params,
            });
            return response;
        } catch (error) {
            console.error('Failed to request withdrawal:', error);
            throw error;
        }
    }

    async getPortfolio() {
        try {
            const response = await this.connection.send({ portfolio: 1 });
            return response;
        } catch (error) {
            console.error('Failed to get portfolio:', error);
            throw error;
        }
    }

    async getProfitTable(params) {
        try {
            const response = await this.connection.send({
                profit_table: 1,
                ...params,
            });
            return response;
        } catch (error) {
            console.error('Failed to get profit table:', error);
            throw error;
        }
    }

    async getProposal(params) {
        try {
            const response = await this.connection.send({
                proposal: 1,
                ...params,
            });
            return response;
        } catch (error) {
            console.error('Failed to get proposal:', error);
            throw error;
        }
    }

    async getOpenContracts() {
        try {
            const response = await this.connection.send({ proposal_open_contract: 1 });
            return response;
        } catch (error) {
            console.error('Failed to get open contracts:', error);
            throw error;
        }
    }

    async getTicksHistory(params) {
        try {
            const response = await this.connection.send({
                ticks_history: params.symbol,
                ...params,
            });
            return response;
        } catch (error) {
            console.error('Failed to get ticks history:', error);
            throw error;
        }
    }

    async getTradingTimes() {
        try {
            const response = await this.connection.send({ trading_times: 1 });
            return response;
        } catch (error) {
            console.error('Failed to get trading times:', error);
            throw error;
        }
    }

    async getTransaction(transaction_id) {
        try {
            const response = await this.connection.send({
                transaction: 1,
                transaction_id,
            });
            return response;
        } catch (error) {
            console.error('Failed to get transaction:', error);
            throw error;
        }
    }

    async transferBetweenAccounts(params) {
        try {
            const response = await this.connection.send({
                transfer_between_accounts: 1,
                ...params,
            });
            return response;
        } catch (error) {
            console.error('Failed to transfer between accounts:', error);
            throw error;
        }
    }

    disconnect() {
        if (this.connection) {
            this.connection.disconnect();
            this.isConnected = false;
            this.token = null;
        }
    }
}

export const derivApiService = new DerivAPIService();
