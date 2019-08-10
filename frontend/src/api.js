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

const getResultString = (result) => {
  return result.result().then((r) => r.asString())
}

class API {
  connect() {
    let contractAddress = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";
    let ethUrl = "http://rinkeby.fluence.one:8545/"
    let appId = "355";
    return fluence.connect(contractAddress, appId, ethUrl).then((s) => {
      this.session = s;
    });
  }
  post(data) {
    return getResultString(this.session.request("POST: " + data));
  }
  put(hash, data) {
    return getResultString(this.session.request("PUT: " + hash + ":" + data));
  }
  get(hash) {
    let result = this.session.request("GET: " + hash);
    return new Promise((resolve, reject) => {
      getResultString(result).then(function (str) {
        if (str) {
          resolve(parseJSONorNonJSON(str));
        } else {
          reject("Hash not found")
        }
      });
    })
  }
}

export default API
