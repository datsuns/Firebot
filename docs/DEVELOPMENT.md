# Development

## Getting Started

1. Run `make setup` to install dependencies.
2. Copy `src/secrets.template.json` to `src/secrets.json` and fill in each field.
   This file must live alongside `secrets.template.json` inside the `src` folder.
3. Start Firebot in development mode with `make start`.

`make start` will fail if `src/secrets.json` does not exist or is missing required keys.
