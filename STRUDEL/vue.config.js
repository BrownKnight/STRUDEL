module.exports = {
  devServer: {
    proxy: {
      "^/iapi": {
        target: "http://localhost:3000"
      },
      "^/api": {
        target: "http://localhost:3000"
      }
    }
  }
};
