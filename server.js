require('dotenv').config({ silent: true });

const server = require('./app');
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

server.then((newsApp) => {
  newsApp.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on port: %d', port);
  });
});
