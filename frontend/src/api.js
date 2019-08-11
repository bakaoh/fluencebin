import * as fluence from "fluence";

const parseJSONorNonJSON = (to_parse) => {
  var to_return = null
  try {
    to_return = JSON.parse(to_parse)
  } catch (e) {
    to_return = {
      mode: 'Plain Text',
      text: to_parse
    }
  }
  return to_return
}

class API {
  connect() {
    // this.session = fluence.directConnect("localhost", 30000, 1);
    // return new Promise((resolve) => {
    //   resolve(this.session)
    // })
    let contractAddress = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";
    let ethUrl = "http://rinkeby.fluence.one:8545/"
    let appId = "366";
    return fluence.connect(contractAddress, appId, ethUrl).then((s) => {
      this.session = s;
    });
  }
  request(obj) {
    return new Promise((resolve, reject) => {
      this.session
        .request(JSON.stringify(obj))
        .result()
        .then((r) => JSON.parse(r.asString()))
        .then((obj) => {
          if (obj.error) {
            reject(obj.error)
          } else {
            resolve(obj)
          }
        })
    })
  }
  post(data) {
    return this.request({
      action: "Post",
      content: data,
    }).then((obj) => obj.hash)
  }
  put(hash, data) {
    return this.request({
      action: "Put",
      hash: hash,
      content: data,
    }).then((obj) => obj.hash)
  }
  get(hash) {
    return this.request({
      action: "Get",
      hash: hash,
    }).then((obj) => parseJSONorNonJSON(obj.content))
  }
}

export default API
