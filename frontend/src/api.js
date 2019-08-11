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

const getResult = (result) => {
  return result.result().then((r) => JSON.parse(r.asString()))
}

class API {
  connect() {
    this.session = fluence.directConnect("localhost", 30000, 1);
    return new Promise((resolve) => {
      resolve(this.session)
    })
    // let contractAddress = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";
    // let ethUrl = "http://rinkeby.fluence.one:8545/"
    // let appId = "355";
    // return fluence.connect(contractAddress, appId, ethUrl).then((s) => {
    //   this.session = s;
    // });
  }
  post(data) {
    return getResult(this.session.request("POST: " + data));
  }
  put(hash, data) {
    return getResult(this.session.request("PUT: " + hash + ":" + data));
  }
  get(hash) {
    let result = this.session.request("GET: " + hash);
    return new Promise((resolve, reject) => {
      getResult(result).then(function (obj) {
        if (obj.error) {
          reject(obj.error)
        } else {
          resolve(parseJSONorNonJSON(obj.content));
        }
      });
    })
  }
}

export default API
