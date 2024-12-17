use wasm_bindgen::prelude::*;
use meval::*;

#[wasm_bindgen]
pub fn calculate(expr: &str) -> String {
    match eval_str(expr) {
        Ok(result) => {
            if result.abs() >= 1e10 || result.abs() <= 1e-10 && result != 0.0 {
                format!("{:.10e}", result) // if numbers are too long
            } else {
                result.to_string()
            }
        }
        Err(_) => String::from("Error: Could not parse!")
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn working() {
        let result = calculate("4+3");
        assert_eq!(result, "7");
    }

    #[test]
    fn handle_error() {
        let result = calculate("invalid string");
        assert_eq!(result, "Error: Could not parse!");
    }

    #[test]
    fn infinity() {
        let result = calculate("1/0");
        assert_eq!(result, "inf");
    }
}
