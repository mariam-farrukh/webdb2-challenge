
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();

        tbl.string('VIN')
            .unique()
            .first();

        tbl.string('Make', 128)
            .notNullable();

        tbl.string('Model',128)
            .notNullable();

        tbl.integer('Mileage')
            .notNullable();

        tbl.string('Transmission', 128)
            .notNullable();

        tbl.string('Title', 128)
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
