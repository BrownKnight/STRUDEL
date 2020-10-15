module.exports = {
  devServer: {
//    https: true,
    proxy: {
      "^/iapi": {
        target: process.env.ENKEL_API_SERVICE
      },
      "^/api": {
        target: process.env.ENKEL_API_SERVICE
      },
      "^/login": {
        target: process.env.ENKEL_API_SERVICE
      }
    }
  }
};
