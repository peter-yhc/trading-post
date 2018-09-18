export function updateStocksCache(symbol, updatedValues) {
  const cache = getStocks()
  const cachedDataIndex = cache.findIndex(stock => stock.symbol === symbol)
  if (cachedDataIndex !== -1) {
    cache[ cachedDataIndex ] = updatedValues
  } else {
    cache.push(updatedValues)
  }
  localStorage.setItem('stocks', JSON.stringify(cache))
}

export function getStocks() {
  return JSON.parse(localStorage.getItem('stocks')) || []
}

export function getDisplaySettings() {
  return JSON.parse(localStorage.getItem('display')) || {[ ACCOUNT.WATCHING ]: [], [ ACCOUNT.PORTFOLIO ]: []}
}

export function updateDisplaySetting(symbol, listToUpdate) {
  const cache = getDisplaySettings()
  if (!cache[ listToUpdate ].includes(symbol)) {
    cache[ listToUpdate ].push(symbol)
  }
  localStorage.setItem('display', JSON.stringify(cache))
  return cache
}

export function getAccounts() {
  return JSON.parse(localStorage.getItem('accounts')) || {}
}

export function createAccount(accountName) {
  const cache = getAccounts()
  if (!cache[ accountName ]) {
    cache[ accountName ] = {name: accountName, stocks: []}
    localStorage.setItem('accounts', JSON.stringify(cache))
  }
  return cache[ accountName ]
}

export const ACCOUNT = Object.seal({
  ALL: 'all',
  WATCHING: 'watching',
  PORTFOLIO: 'portfolio'
})
