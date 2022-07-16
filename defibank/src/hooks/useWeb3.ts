import ABI from '../assets/DefiBankAbi.json'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { Configs } from '../configs'
import { AccountBalance, TokenInfo } from '../types'

export function useWeb3() {
  const { ContractAddress } = Configs()
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')
  const eth = web3.givenProvider
  const defibank = new web3.eth.Contract(ABI as AbiItem[], ContractAddress)
  defibank.handleRevert == true

  async function getTokenInfo(): Promise<TokenInfo> {
    const [decimals, name, symbol] = await Promise.all([
      defibank.methods.decimals().call(),
      defibank.methods.name().call(),
      defibank.methods.symbol().call(),
    ])
    return { decimals, name, symbol }
  }

  async function getOwner(): Promise<string> {
    const owner = await defibank.methods.getOwner().call()
    return owner.toLowerCase()
  }

  async function createAccount(accountName: string) {
    defibank.handleRevert = true
    await defibank.methods
      .createAccount(accountName)
      .send({ from: await getAccount() })
  }
  async function deposit(accountName: string, amount: number) {
    await defibank.methods
      .deposit(accountName, amount)
      .send({ from: await getAccount() })
  }
  async function withdraw(accountName: string, amount: number) {
    await defibank.methods
      .withdraw(accountName, amount)
      .send({ from: await getAccount() })
  }
  async function transfer(sender: string, reciver: string, amount: number) {
    await defibank.methods
      .transfer(sender, reciver, amount)
      .send({ from: await getAccount() })
  }
  async function multipleTransfer(
    sender: string,
    reciver: string[],
    amount: number
  ) {
    const Reciver = reciver.map((r) => {
      return `"${r}"`
    })
    console.log(Reciver)
    await defibank.methods
      .multipleTransfer(sender, reciver, amount)
      .send({ from: await getAccount() })
  }
  async function getBankAccountsListByOwner(
    ownerAddress: string
  ): Promise<AccountBalance[]> {
    return await defibank.methods
      .getBankAccountsListByOwner(ownerAddress)
      .call()
  }
  async function balanceOf(ownerAddress: string): Promise<AccountBalance> {
    return await defibank.methods.balanceOf(ownerAddress).call()
  }
  async function accountBalance(accountName: string): Promise<AccountBalance> {
    return await defibank.methods.accountBalance(accountName).call()
  }

  async function getAccount() {
    const accounts = await web3.eth.getAccounts()
    return accounts[0] ? accounts[0].toLowerCase() : ''
  }

  async function getAccountInject() {
    const accounts = await eth.request({ method: 'eth_requestAccounts' })
    return accounts[0] ? accounts[0].toLowerCase() : ''
  }

  async function isDuplicate(accountName: string) {
    return await defibank.methods.isDuplicate(accountName).call()
  }

  return {
    getTokenInfo,
    getOwner,
    createAccount,
    deposit,
    withdraw,
    transfer,
    multipleTransfer,
    getBankAccountsListByOwner,
    balanceOf,
    accountBalance,
    getAccount,
    getAccountInject,
    isDuplicate,
    eth,
  }
}
