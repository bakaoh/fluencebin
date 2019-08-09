use fluence::sdk::*;

fn init() {
    logger::WasmLogger::init_with_level(log::Level::Info).unwrap();
}

#[invocation_handler(init_fn = init)]
fn main(arg: String) -> String {
    if (arg.starts_with("POST: ")) {
        return String::from("Randomahahfa");
    } else if (arg.starts_with("GET: ")) {

    }
    return String::from("Invalid action");
}
