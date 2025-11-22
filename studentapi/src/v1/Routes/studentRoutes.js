const express = require('express');

const router = express.Router();

//GET får å få alle studenter
router.get('/', );  
router.get('/:id', ); //GET for å få en student basert på ID, og :id sier at id er en variabel

//POST for å legge til en ny student
router.post('/', );

//PUT for å oppdatere en student basert på ID
router.put('/:id', );

//DELETE for å slette en student basert på ID
router.delete('/:id', );

//eksporter routeren, slik at den kan brukes i andre filer
module.exports = router;