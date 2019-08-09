import * as fluence from "fluence";

const parseJSONorNonJSON = (to_parse) => {
  var to_return = null
  try {
    to_return = JSON.parse(to_parse)
  } catch (e) {
    to_return = {
      mode: null,
      text: to_parse
    }
  }
  return to_return
}

const getResultString = (result) => {
  return result.result().then((r) => r.asString())
}

class API {
  constructor () {
    // let contractAddress = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";
    // let ethUrl = "http://rinkeby.fluence.one:8545/"
    // let appId = "344";
    // fluence.connect(contractAddress, appId, ethUrl).then((s) => {
    //   this.session = s;
    // });
    this.session = fluence.directConnect("localhost", 30000, 1);
  }

  add (data) {
    let result = this.session.request("POST: " + data);
    return new Promise((resolve) => {
      getResultString(result).then(function (str) {
        resolve(str);
      });
    })
  }
  cat (hash) {
    let result = this.session.request("GET: " + hash);
    return new Promise((resolve) => {
      getResultString(result).then(function (str) {
        resolve(parseJSONorNonJSON(str));
      });
    })
  }
}

export default API
