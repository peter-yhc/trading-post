export function updateStocksCache(symbol, updatedValues) {
  const cache = getStocks()
  cache[symbol] = updatedValues
  localStorage.setItem('stocks', JSON.stringify(cache))
}

export function getStocks() {
  return JSON.parse(localStorage.getItem('stocks')) || {}
}

export function getDisplaySettings() {
  return JSON.parse(localStorage.getItem('display')) || { [ACCOUNT.WATCHING]: [], [ACCOUNT.PORTFOLIO]: [] }
}

export function updateDisplaySetting(symbol, listToUpdate) {
  const cache = getDisplaySettings()
  if (!cache[listToUpdate].includes(symbol)) {
    cache[listToUpdate].push(symbol)
  }
  localStorage.setItem('display', JSON.stringify(cache))
  return cache
}

export function getAccounts() {
  return JSON.parse(localStorage.getItem('accounts')) || {}
}

export function createAccount(accountName) {
  const cache = getAccounts()
  if (!cache[accountName]) {
    cache[accountName] = { name: accountName, stocks: {} }
    localStorage.setItem('accounts', JSON.stringify(cache))
  }
  return cache[accountName]
}

export function updateAccountCache(accountName, data) {
  const cache = getAccounts()
  cache[accountName] = data
  localStorage.setItem('accounts', JSON.stringify(cache))
}

export function addStockToAccount(event) {
  const accountCache = getAccounts()
  const stockCache = getStocks()

  const currentMarketValue = stockCache[event.symbol].previousClose * event.shares
  accountCache[event.accountName].stocks[event.symbol] = {
    symbol: event.symbol,
    shares: event.shares,
    bookCost: event.bookCost,
    marketValue: currentMarketValue.toFixed(2),
    unrealisedGains: (currentMarketValue - event.bookCost).toFixed(2)
  }
  console.log(accountCache[event.accountName])
  localStorage.setItem('accounts', JSON.stringify(accountCache))
  return accountCache[event.accountName]
}

export const ACCOUNT = Object.seal({
  ALL: 'all',
  WATCHING: 'watching',
  PORTFOLIO: 'portfolio'
})
