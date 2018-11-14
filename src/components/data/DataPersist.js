import AccountModel from './model/AccountModel'

export function getStocks() {
  return JSON.parse(localStorage.getItem('stocks')) || {}
}

export function updateStocksCache(symbol, updatedValues) {
  const cache = getStocks()
  cache[symbol] = updatedValues
  localStorage.setItem('stocks', JSON.stringify(cache))
}

export function deleteStock(symbol) {
  const cache = getStocks()
  delete cache[symbol]
  localStorage.setItem('stocks', JSON.stringify(cache))
}

export function getAccounts() {
  return JSON.parse(localStorage.getItem('accounts')) || {}
}

export function createAccount(accountName) {
  const cache = getAccounts()
  if (!cache[accountName]) {
    cache[accountName] = new AccountModel(accountName)
    localStorage.setItem('accounts', JSON.stringify(cache))
  }
  return cache[accountName]
}

export function updateAccountCache(accountName, data) {
  const cache = getAccounts()
  cache[accountName] = data
  localStorage.setItem('accounts', JSON.stringify(cache))
}
