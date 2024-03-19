// eslint-disable-next-line no-undef
module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["/node_modules/", "\\.css$"],
};
