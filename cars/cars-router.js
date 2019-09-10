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


//middleware

function validateCar(req, res, next) {
    const {VIN, Make, Model, Mileage, Transmission, Title} = req.body;
    if(!VIN && !Make && !Model && !Mileage && !Transmission && !Title ){
        return res.status(400).json({message: "Can't create, missing data"});
    }
    if(!VIN){
        return res.status(400).json({message: "Must have VIN"});
    }
    if(!Make){
        return res.status(400).json({message: "Must have car Make"});
    }
    if(!Model){
        return res.status(400).json({message: "Must have car Model"});
    }
    if(!Mileage){
        return res.status(400).json({message: "Must include Mileage"});
    }
    if(isNaN(Mileage)){
        return res.status(400).json({message: "Mileage has to be numbers"});
    }
    if(!Transmission){
        return res.status(400).json({message: "Must have Transmission type"});
    }
    if(!Title){
        return res.status(400).json({message: "Must have status of title"});
    }
    if(VIN.length > 128){
        return res.status(400).json({error: "VIN number is not possible, VIN has 17 characters, so must be shorter than 128."});
    }
    next();
}

module.exports = router;
