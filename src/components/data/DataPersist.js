export function updateStocks(symbol, updatedValues) {
  const cache = JSON.parse(localStorage.getItem('stocks')) || []
  const cachedDataIndex = cache.findIndex(stock => stock.symbol === symbol)
  if (cachedDataIndex !== -1) {
    cache[cachedDataIndex] = updatedValues
  } else {
    cache.push(updatedValues)
  }
  localStorage.setItem('stocks', JSON.stringify(cache))
}

export function retrieveStocks() {
  return JSON.parse(localStorage.getItem('stocks')) || []
}

export function getDisplay() {
  return JSON.parse(localStorage.getItem('display')) || {[DISPLAY.WATCHING]: [], [DISPLAY.PORTFOLIO]: []}
}

export function updateDisplay(symbol, listToUpdate) {
  const cache = getDisplay()
  if (!cache[listToUpdate].includes(symbol)) {
    cache[listToUpdate].push(symbol)
  }
  localStorage.setItem('display', JSON.stringify(cache))
  return cache
}

export const DISPLAY = Object.seal({
  ALL: 'all',
  WATCHING: 'watching',
  PORTFOLIO: 'portfolio'
})
