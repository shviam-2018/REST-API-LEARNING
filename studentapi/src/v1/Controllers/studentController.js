const {
    getAllObjects,
    addObject,
    getObjectById,
    deleteObjectById,
    updateObjectById
} = require('../Data/DB_Generic');

const getAllStudents = async (req, res) => {
    try {
        const students = await getAllObjects();
        res.status(200).json({sucess: true, data: students});
    } catch (error) {
        res.status(500).json({sucess: false, error: 'Server Error' });
    }
};

const getSingleStudent = async (req, res) => {
    try {
        const student = await getObjectById(req.params.id);
        res.status(200).json({sucess: true, data: student});
        if (!student) { /*gir en status 404 hvis studenten ikke finnes, jeg legger inn en sjekk for 404 fordi den er den 
err som jeg har størst mulighet for å få*/
            return res.status(404).json({sucess: false, error: 'Student not found' }); 
        }
    } catch (error) {
        res.status(500).json({sucess: false, error: 'Server Error' });
    }
};

const createStudentObject = async (req, res) => {
    try {
        const {name, age} = req.body;
        const newStudent = await addObject({name, age});
        res.status(201).json({sucess: true, data: newStudent});
    } catch (error) {
        res.status(500).json({sucess: false, error: 'Server Error' });
    }
};

const updateStudentObject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age } = req.body;
        const updateStudent = await updateObjectById(id, { name, age });
        res.status(200).json({ success: true, data: updateStudent });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

const deleteStudentObject = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteObjectById(id);
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};


module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudentObject,
    updateStudentObject,
    deleteStudentObject
};