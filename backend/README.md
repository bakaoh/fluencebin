# FluenceBin Backend

## Usage

Build wasm

```bash
~$ cargo +nightly build --target wasm32-unknown-unknown --release
```

Run debug

```bash
~$ docker run --rm -v `pwd`/target/wasm32-unknown-unknown/release/fluencebin.wasm:/code/code.wasm -p 30000:30000 fluencelabs/frun
```