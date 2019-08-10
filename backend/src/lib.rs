extern crate chashmap;
#[macro_use]
extern crate lazy_static;

use fluence::sdk::*;
use std::sync::atomic::{AtomicU32, Ordering};
use chashmap::CHashMap;

static COUNTER: AtomicU32 = AtomicU32::new(0);
lazy_static!{
    static ref CONTENT: CHashMap<String, String> = CHashMap::new();
}

fn init() {
    logger::WasmLogger::init_with_level(log::Level::Info).unwrap();
}

#[invocation_handler(init_fn = init)]
fn main(arg: String) -> String {
    let mut req = arg.clone();
    if req.starts_with("POST: ") {
        let hash = COUNTER.fetch_add(1, Ordering::SeqCst).to_string();
        let content = req.split_off(6);
        CONTENT.insert(hash.clone(), content);
        return hash
    } else if req.starts_with("PUT: ") {
        let mut data = req.split_off(5);
        let params: Vec<&str> = data.split(":").collect();
        let hash = String::from(params[0]);
        let content = data.split_off(hash.len() + 1);
        CONTENT.insert(hash.clone(), content);
        return hash
    } else if req.starts_with("GET: ") {
        let hash = req.split_off(5);
        let content = CONTENT.get(&hash);
        return match content {
            Some(ref v) => v.to_string(),
            None => String::new(),
        }
    }
    String::new()
}
