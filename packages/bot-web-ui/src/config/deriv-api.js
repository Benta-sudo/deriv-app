export const DERIV_API_CONFIG = {
    app_id: 72216,
    endpoint: 'wss://ws.binaryws.com/websockets/v3',
    redirect_url: 'https://osamhnr.com/oauth/callback',
    oauth_url: 'https://oauth.deriv.com/oauth2/authorize',
    token_url: 'https://oauth.deriv.com/oauth2/token',
    client_id: 72216, // Your app ID
    scope: 'read,write,trade,payments,admin', // Required scopes for trading and payments
};

export const API_ENDPOINTS = {
    authorize: 'authorize',
    balance: 'balance',
    buy: 'buy',
    sell: 'sell',
    statement: 'statement',
    cashier: 'cashier',
    cashierPayments: 'cashier_payments',
    cashierWithdrawal: 'cashier_withdrawal',
    contractUpdate: 'contract_update',
    contractUpdateHistory: 'contract_update_history',
    contractsFor: 'contracts_for',
    portfolio: 'portfolio',
    profitTable: 'profit_table',
    proposal: 'proposal',
    proposalOpenContract: 'proposal_open_contract',
    ticks: 'ticks',
    ticksHistory: 'ticks_history',
    tradingTimes: 'trading_times',
    transaction: 'transaction',
    transferBetweenAccounts: 'transfer_between_accounts',
};
