# React Frontend for a Two-tab app

A small project that demonstrates a React-based interface integrating 
- Rust (via wasm)
- WebGL for rendering shaders.

## Dependencies
- nodejs
- Rust
- wasm-pack

If you use nix, a flake is provided with all the dependencies.

## Building

Build the wasm library using:
```
npm run build:wasm
```

Set the shader generator server's URL in a .env/.env.*
```
VITE_ELX_URL=https://my.generator.com/gen_shader
```

Then run
```
npm run build
```

# Developing

Start the dev server using:
```
npm run dev
```
