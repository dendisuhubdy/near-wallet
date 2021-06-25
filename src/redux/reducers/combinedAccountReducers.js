import { combineReducers } from 'redux'

import account from './account'
import transactions from './transactions'
import allAccounts from './allAccounts'
import availableAccounts from './availableAccounts'
import flowLimitation from './flowLimitation'
import recoveryMethods from './recoveryMethods'
import sign from './sign'
import staking from './staking'
import tokens from './tokens'
import nft from './nft'

export default (history) => combineReducers({
    allAccounts,
    availableAccounts,
    account,
    transactions,
    sign,
    recoveryMethods,
    staking,
    flowLimitation,
    tokens,
    nft
})
