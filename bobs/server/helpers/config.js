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
/*<<<<<<< my sample DB
config.database.username = 'admin';
config.database.password = 'admin1';
config.database.port = '19014';
config.database.url = 'ds119014.mlab.com';
config.database.name = 'bobs';
=======*/
config.database.username = 'bob';
config.database.password = 'password1';
config.database.port = '61913';
config.database.url = 'ds161913.mlab.com';
config.database.name = 'bcrs';
/*>>>>>>> e227d05b6a85c87bbcee2646f9a2da01e570c06e */


module.exports = config;
