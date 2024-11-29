const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.baseUrl || "https://d2yqnm7qbjnp0v.cloudfront.net",
    env: {
      email: process.env.email || "fabiogadea21@gmail.com",
      password: process.env.password || "Qwerty01!",
    },
    defaultCommandTimeout: 15000,
    setupNodeEvents(on, config) {
      require("@cypress/grep/src/plugin")(config);
      return config;
    },
  },
});
