# Using `dotenv` to Manage Environment Variables in Node.js

This guide provides a step-by-step walkthrough on how to use the `dotenv` package to manage secret keys and other environment variables in a Node.js project.

## Why use a `.env` file?

- **Security**: It keeps sensitive data like API keys and database passwords out of your source code, preventing them from being accidentally exposed or committed to public repositories like GitHub.
- **Configuration**: It allows for different configurations between environments (development, testing, production) without changing the code.

---

## Step 1: Installation

First, you need to add the `dotenv` package to your project as a dependency.

```bash
npm install dotenv
```

---

## Step 2: Create the `.env` File

In the root directory of your project, create a new file named `.env`. This file will hold your environment-specific variables in a `KEY=VALUE` format.

**Example `.env` file:**

```
# Database Credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD="your_super_secret_password"

# API Configuration
API_KEY=abc123xyz789
PORT=3000
```

*Note: Lines starting with `#` are treated as comments.*

---

## Step 3: Ignore the `.env` File in Git

This is the most important step for security. You **must** tell Git to ignore your `.env` file so it is never committed. Add a single line to your `.gitignore` file:

```
.env
```

This ensures your secrets remain on your local machine and are not pushed to GitHub.

---

## Step 4: Load and Use Your Variables

To make your variables available in your application, you need to load the `.env` file at the very beginning of your application's entry point (e.g., `index.js`).

**1. Load `dotenv`:**
Place this line at the absolute top of your main file:

```javascript
require('dotenv').config();
```

**2. Access Variables:**
Once loaded, `dotenv` attaches the variables to the `process.env` object in Node.js. You can access them throughout your application.

**Example `index.js`:**

```javascript
// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const app = express();

// Access variables using process.env
const port = process.env.PORT || 3001; // Use a default value if not set
const dbPassword = process.env.DB_PASSWORD;

console.log(`The database password is: ${dbPassword}`);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

---

## Advanced Properties and Usage

The `.config()` method can take an options object for more advanced use cases.

### Custom Path

If your `.env` file is not in the root directory, you can specify its path.

```javascript
require('dotenv').config({ path: './config/.env.local' });
```

### Preloading

You can load `dotenv` without modifying your code by using the `-r` (or `--require`) command-line option when running Node.js. This is useful for running scripts or in production environments.

```bash
node -r dotenv/config your_script.js
```

This command does the same thing as adding `require('dotenv').config()` to the top of your file.
