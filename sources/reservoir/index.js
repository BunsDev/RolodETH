const axios = require("axios");

function reservoir(address) {
    this.name = "JSONImporter_" + address + "_" + Date.now();
    this.address = address;
}

reservoir.prototype.addTo = async function (RolodETH) {
    let requests = 0;
    let continuation = true;
    let url = 'https://api.reservoir.tools/collections/v5?includeTopBid=false&sortBy=allTimeVolume&limit=20'
    while (continuation) {
        let resp = await axios.get(url);
        let collections = resp.data.collections;
        for (const collection of collections) {
            let address = collection.id;
            RolodETH.addProperty(address, "name", collection.name);
            RolodETH.addProperty(address, "imageUrl", collection.image);
            RolodETH.addProperty(address, "externalUrl", collection.externalUrl);
            RolodETH.addTag(address, "nft")
            if (collection.openseaVerificationStatus) {
                RolodETH.addTag(address, "opensea_verified")
            }
        }
        if (resp.data.continuation != null) {
            url = "https://api.reservoir.tools/collections/v5?includeTopBid=false&sortBy=allTimeVolume&limit=20&continuation=" + resp.data.continuation
        } else {
            continuation = false;
        }
        console.log("requests:", requests++)
    }
    return;
    for (const address in labels) {
        if (Object.hasOwnProperty.call(labels, address)) {
            const label = labels[address];
            console.log(label)
            if (label.name != null && label.name != "") {
                RolodETH.addProperty(address, "name", label.name);
            }
            for (const tag of label.labels) {
                RolodETH.addTag(address, tag);
            }
        }
    }

}

module.exports = reservoir;