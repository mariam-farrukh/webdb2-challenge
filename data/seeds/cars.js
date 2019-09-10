
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN : '123456', 
          Make: 'Nissan', 
          Model: 'Rogue', 
          Mileage: 1000, 
          Transmission: 'Automatic', 
          Title: 'Clean'
        },
        {
          VIN : '23456', 
          Make: 'Nissan', 
          Model: 'Rogue XL', 
          Mileage: 10000, 
          Transmission: 'Automatic', 
          Title: 'Clean'
        },
    ]);
  });
};
