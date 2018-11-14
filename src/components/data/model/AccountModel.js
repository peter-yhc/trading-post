import AccountModelConfig from './AccountModelConfig'

export default (name, stocks = {}, config = new AccountModelConfig()) => ({
  name,
  stocks,
  config: Object.assign({}, new AccountModelConfig(), config)
})
