# Contributing to Node.js MVC Shop Sample

Thanks for taking an interest in contributing. This file contains a short checklist and conventions to make contributions smooth.

## Getting started

1. Fork the repository and create a branch for your change:

   ```bash
   git checkout -b feature/short-description
   ```

2. Install dependencies and run locally:

   ```bash
   npm install
   npm start
   ```

3. Verify functionality in the browser at `http://localhost:3000`.

## Code style

- Use CommonJS `require`/`module.exports` to match the project.
- Prefer `async/await` for asynchronous DB operations.
- Keep functions small and focused. Add comments for non-obvious logic.

## Database

- The project uses MySQL via `mysql2` and a connection pool configured in `util/database.js`.
- Ensure your local MySQL is running and `node-complete` database exists, or update credentials accordingly.

## Commit messages & branches

- Use short, descriptive commit messages. Example: `Add cart quantity update`.
- Create branches named `feature/*`, `fix/*`, or `chore/*`.

## Pull requests

- Open a PR against the `main` branch (or the repo's default branch). Describe what the change does and why.
- Keep PRs focused and small for easier review.

## Tests

- There are no automated tests in this sample yet. If you add tests, include instructions here.

## Thank you

Contributions are welcome — open an issue or PR and we'll review it.
