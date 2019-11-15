
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN : '1a2b3c4d5e6f7g8h9', 
          Make: 'Nissan', 
          Model: 'Rogue', 
          Mileage: 1000, 
          Transmission: 'Automatic', 
          Title: 'Clean'
        },
        {
          VIN : '2b3c4d5e6f7g8h9i1', 
          Make: 'Nissan', 
          Model: 'Rogue XL', 
          Mileage: 10000, 
          Transmission: 'Automatic', 
          Title: 'Clean'
        },
    ]);
  });
};
