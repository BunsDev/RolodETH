const Scraper = require('./scraper')
const RolodETH = new (require("./RolodETH"))("./data/", 1);

const rpcs = [
    
  ]

const scraper = new Scraper("http://localhost:3000");

(async () => {
    let latestBlock = await scraper.provider.getBlockNumber();
    console.log(latestBlock)
    await scraper.scrapeBlocks(RolodETH, latestBlock - 100, latestBlock)

})();