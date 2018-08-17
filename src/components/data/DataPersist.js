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
