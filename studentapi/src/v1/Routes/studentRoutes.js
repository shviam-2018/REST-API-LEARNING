const express = require('express');
const {getAllStudents, getSingleStudent, createStudentObject, updateStudentObject, deleteStudentObject} = require('../Controllers/studentController');

const router = express.Router();

//GET får å få alle studenter
router.get('/', getAllStudents);  
router.get('/:id', getSingleStudent); //GET for å få en student basert på ID, og :id sier at id er en variabel

//POST for å legge til en ny student
router.post('/', createStudentObject);
//PUT for å oppdatere en student basert på ID
router.put('/:id', updateStudentObject);

//DELETE for å slette en student basert på ID
router.delete('/:id', deleteStudentObject);

//eksporter routeren, slik at den kan brukes i andre filer
module.exports = router;