const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Could not get cars information from database'});
        });
});

router.post('/', validateCar, (req, res) => {
    const newCar = req.body;
    db('cars')
        .insert(newCar)
        .then(ids => {
            db('cars').where({id: ids[0]})
            .then(newCar => {
                res.status(201).json(newCar);
            });
        })
        .catch(err => {
            console.log('Post err', err);
            res.status(500).json({message: 'Could not store data'});
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('cars')
    .where({id})
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json({ message: 'Successfully updated Car information' });
      } else {
        res.status(404).json({ message: 'Could not find this car to update' });
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Error updating car from database' });
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('cars')
    .where({ id })
    .truncate()
    .then(count => {
        if (count) {
          res.status(200).json({ message: 'Successfully deleted the car deleted' });
        } else {
          res.status(404).json({ message: "Could not find this car to delete" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Could not delete car, can't access database" });
    });
});
//middleware

function validateCar(req, res, next) {
    const {VIN, Make, Model, Mileage, Transmission, Title} = req.body;
    if(!VIN && !Make && !Model && !Mileage && !Transmission && !Title ){
        return res.status(400).json({error: "Can't create, missing data"});
    }
    if(!VIN){
        return res.status(400).json({error: "Must have VIN"});
    }
    if(!Make){
        return res.status(400).json({error: "Must have car Make"});
    }
    if(!Model){
        return res.status(400).json({error: "Must have car Model"});
    }
    if(!Mileage){
        return res.status(400).json({error: "Must include Mileage"});
    }
    if(!Transmission){
        return res.status(400).json({error: "Must have Transmission type"});
    }
    if(!Title){
        return res.status(400).json({error: "Must have status of title"});
    }
    if(VIN.length !== 17){
        return res.status(400).json({error: "VIN is not possible, VIN should have 17 characters."});
    }
    next();
}

module.exports = router;
