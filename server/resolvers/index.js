const { merge } = require('lodash');
const messageResolver = require('./message');
const resolvers = merge(messageResolver);

module.exports = resolvers;
