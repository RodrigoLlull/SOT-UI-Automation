const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.baseUrl || "https://d2yqnm7qbjnp0v.cloudfront.net",
    env: {
      email: process.env.email || "",
      password: process.env.password || "",
    },
    defaultCommandTimeout: 15000
  },
});
