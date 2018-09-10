export function updateStocksCache(symbol, updatedValues) {
  const cache = getStockCache()
  const cachedDataIndex = cache.findIndex(stock => stock.symbol === symbol)
  if (cachedDataIndex !== -1) {
    cache[cachedDataIndex] = updatedValues
  } else {
    cache.push(updatedValues)
  }
  localStorage.setItem('stocks', JSON.stringify(cache))
}

export function getStockCache() {
  return JSON.parse(localStorage.getItem('stocks')) || []
}

export function getDisplaySettings() {
  return JSON.parse(localStorage.getItem('display')) || {[ACCOUNT.WATCHING]: [], [ACCOUNT.PORTFOLIO]: []}
}

export function updateDisplaySetting(symbol, listToUpdate) {
  const cache = getDisplaySettings()
  if (!cache[listToUpdate].includes(symbol)) {
    cache[listToUpdate].push(symbol)
  }
  localStorage.setItem('display', JSON.stringify(cache))
  return cache
}

export const ACCOUNT = Object.seal({
  ALL: 'all',
  WATCHING: 'watching',
  PORTFOLIO: 'portfolio'
})
