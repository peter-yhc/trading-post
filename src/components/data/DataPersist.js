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

export function retrieveStock(symbol) {
  // let cache = JSON.parse(localStorage.getItem('stocks')) || []
  // if (cache.length > 0) {
  //   const stock = cache.find(stock => stock.symbol === symbol)
  //   if (moment().diff(stock.fetchedAt, 'days') === 0) {
  //     console.log(`Cache is valid: ${symbol}`)
  //     return stock
  //   }
  // }

  return retrieveStocks().find(stock => stock.name === symbol)
}