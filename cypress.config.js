const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://d2yqnm7qbjnp0v.cloudfront.net",
    env: {
      email: "fabiogadea21@gmail.com",
      password: "Qwerty01!",
      dashboardEndpoint: "/dashboard"
    }
  },
});
