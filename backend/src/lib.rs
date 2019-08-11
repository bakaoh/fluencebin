extern crate chashmap;
#[macro_use]
extern crate lazy_static;

use fluence::sdk::*;
use std::sync::atomic::{AtomicU32, Ordering};
use chashmap::CHashMap;
use serde::{Deserialize, Serialize};

static COUNTER: AtomicU32 = AtomicU32::new(0);
lazy_static!{
    static ref CONTENT: CHashMap<String, String> = CHashMap::new();
}

fn init() {
    logger::WasmLogger::init_with_level(log::Level::Info).unwrap();
}

#[derive(Serialize, Deserialize)]
#[serde(tag = "action")]
pub enum Request {
    Post { content: String },
    Put { hash: String, content: String },
    Get { hash: String },
}

#[derive(Serialize, Deserialize)]
#[serde(untagged)]
pub enum Response {
    Post { hash: String },
    Put { hash: String },
    Get { content: String },
    Error { error: String },
}

#[invocation_handler(init_fn = init)]
fn main(arg: String) -> String {
    let req: Request = serde_json::from_str(arg.as_str()).unwrap();
    let res = match req {
        Request::Post { content } => {
            let hash = COUNTER.fetch_add(1, Ordering::SeqCst).to_string();
            CONTENT.insert(hash.clone(), content);
            Response::Post { hash }
        }
        Request::Put { hash, content } => {
            CONTENT.insert(hash.clone(), content);
            Response::Put { hash }
        }
        Request::Get { hash } => {
            let content = CONTENT.get(&hash);
            match content {
                Some(ref v) => Response::Get { content: v.to_string() },
                None => Response::Error { error: String::from("Not found") },
            }
        }
    };
    return serde_json::to_string(&res).unwrap()
}
