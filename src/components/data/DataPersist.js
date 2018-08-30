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
  return JSON.parse(localStorage.getItem('display')) || {tracking: [], portfolio: []}
}

export function updateDisplay(symbol, listToUpdate) {
  const cache = getDisplay()

  switch(listToUpdate) {
    case DISPLAY.TRACKING:
      if (!cache[DISPLAY.TRACKING].includes(symbol)) {
        cache[DISPLAY.TRACKING].push(symbol)
      }
      break;
    case DISPLAY.PORTFOLIO:
      if (!cache[DISPLAY.PORTFOLIO].includes(symbol)) {
        cache[DISPLAY.PORTFOLIO].push(symbol)
      }
      break;
    default:
      console.log(`Error: Unknown list type ${listToUpdate}`)
  }

  localStorage.setItem('display', JSON.stringify(cache))
  return cache
}

export const DISPLAY = Object.seal({
  TRACKING: 'tracking',
  PORTFOLIO: 'portfolio'
})
