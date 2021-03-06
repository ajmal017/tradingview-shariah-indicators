let shariahStocks = [];
const url = chrome.runtime.getURL('stocks.json');

fetch(url)
  .then((response) => response.json())
  .then((json) => { shariahStocks = json; });

const shariahColour = '#00a97f';
const selectors = {
  row: '.tv-screener-table__symbol-container',
  code: '.tv-screener__symbol',
  name: '.tv-screener__description',
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.status === 'ready') {
      $(selectors.row).each((i, el) => {
        const code = $(el).find(selectors.code).text().trim()
        const stock = shariahStocks.find(o => o.code === code);

        if (stock !== undefined) {
          $(el).find(selectors.code).css('color', shariahColour);
        };
      });
    }
  }
);
