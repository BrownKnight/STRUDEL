module.exports = {
  apps: [{
    name: 'ENKEL',
    script: './dist/server/main.js',
    cwd: './ENKEL',
    node_args: '-r dotenv/config',
  }]
};