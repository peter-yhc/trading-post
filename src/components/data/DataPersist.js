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

export function getTracking() {
  return JSON.parse(localStorage.getItem('tracking')) || []
}

export function updateTracking(symbol) {
  const cache = getTracking()
  if (!cache.includes(symbol)) {
    cache.push(symbol)
  }
  localStorage.setItem('tracking', JSON.stringify(cache))
  return cache
}
