if (process.env.NODE_ENV === 'production'){//}'development') {
  module.exports = require('./configureStore.dev');
} else {
  module.exports = require('./configureStore.prod');
} 


