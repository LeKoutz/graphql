# graphql

A personal profile dashboard for Zone01 Athens students, built with vanilla JavaScript and the Zone01 GraphQL API. Displays your school data through four sections and four hand-built SVG graphs.

**[Live demo →](https://lekoutz.github.io/graphql/)**

## Features

### Profile sections
- **Personal Info** — login, name, email, campus
- **Audit Ratio** — given vs received (kB), with a colour-coded semicircle gauge (green / orange / red)
- **Progress** — level timeline, level step chart, and project count bar chart
- **Milestones** — piscine cards showing status, start and end date

### Graphs (hand-built SVG, no libraries)
- **Audit ratio gauge** — semicircle, 0–2 scale, colour reflects ratio health
- **Level timeline** — horizontal progress bar from level 0 to 60
- **Level step chart** — month-by-month progression
- **Project count bar chart** — activity per month, hover tooltip shows project names and XP; checkpoints grouped as a single exam event per day

### Authentication
- Login with username or email + password
- JWT stored in `sessionStorage` (clears on tab close)
- Bearer token attached to all GraphQL requests
- Logout clears token and re-renders the login form

## Running locally

Serve the project root with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Then open `http://localhost:8080` or the port specified by npx and log in with your Zone01 credentials.

> **Note:** Login requires a Zone01 Athens account.