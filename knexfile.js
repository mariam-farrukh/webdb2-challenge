// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/car-dealer.db3',
    },
    migrations: {
      directory: './data/migartions',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
};
