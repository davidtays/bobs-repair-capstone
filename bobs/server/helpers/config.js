let config = {};

/**
 * Localhost web server configurations
 */
config.web = {};
config.web.port = process.env.PORT || '3000';
config.web.secret = 'topsecret';


/**
 * Development database configurations
 *
 */
config.database = {};
config.database.username = 'bob';
config.database.password = 'password1';
config.database.port = '61913';
config.database.url = 'ds16193.mlab.com';
config.database.name = 'bcrs';


module.exports = config;
