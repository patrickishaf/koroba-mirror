const trading_urls = {
  getRates: function(from: string, ...to: string[]) {
    return `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`
  }
}

export default trading_urls;