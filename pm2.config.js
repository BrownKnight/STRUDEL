module.exports = {
  apps: [{
    name: 'ENKEL',
    script: './ENKEL/dist/server/main.js',
    cwd: './ENKEL',
    node_args: '-r dotenv/config',
  }]
};