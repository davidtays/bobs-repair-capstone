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
config.database.username = 'admin';
config.database.password = 'admin1';
config.database.port = '19014';
config.database.url = 'ds119014.mlab.com';
config.database.name = 'bobs';


module.exports = config;
