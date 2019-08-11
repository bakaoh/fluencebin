# FluenceBin

FluenceBin a fully decentralized application for sharing code.

The frontend of this project is based on [ipfsbin](https://github.com/victorb/ipfsbin). By using [Fluence](https://fluence.network/) as the backend instead of [ipfs](https://ipfs.io/), FluenceBin allows users update content without changing urls.

## Live App

[Link](http://ipfs.fluence.one:8080/ipfs/QmZHMab9HkbAQbh3VRMsS1XTzpZY76XnoCYEHR9rUZhMBm/)

Fluence backend config:

```javascript
let contractAddress = "0xeFF91455de6D4CF57C141bD8bF819E5f873c1A01";
let ethUrl = "http://rinkeby.fluence.one:8545/"
let appId = "366";
```

## TODO

- [ ] User profile
- [ ] Access control
- [ ] Line comment
- [ ] Repl
- [ ] Live coding

## Backend

- Build

```bash
$ cd backend
$ cargo +nightly build --target wasm32-unknown-unknown --release
```

- Run debug

```bash
$ docker run --rm -v `pwd`/target/wasm32-unknown-unknown/release/fluencebin.wasm:/code/code.wasm -p 30000:30000 fluencelabs/frun
```

- Deploy ([doc](https://fluence.dev/docs/publishing-a-backend-app))

## Frontend

- Build

```bash
$ cd frontend
$ npm install
$ npm build
```

- Run dev

```bash
$ npm start
```

- Deploy

```bash
$ IPFS_ADDR=$(host ipfs.fluence.one | awk '/has address/ { print $4 }')
$ ipfs --api /ip4/$IPFS_ADDR/tcp/5001 add -r path/to/built/frontend
```
