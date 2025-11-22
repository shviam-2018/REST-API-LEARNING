const { route } = require('../Routes/studentRoutes');
const {getStudents, getStudentById, createStudent, updateStudent, deleteStudent} = require('../Services/studentService');

const getAllStudents = async (req, res) => {
    try {
        const students = await getStudents();
        res.status(200).json({sucess: true, data: students});
    } catch (error) {
        res.status(500).json({sucess: false, error: 'Server Error' });
    }
};

const getSingleStudent = async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        res.status(200).json({sucess: true, data: student});
        if (!student) { /*gir en status 404 hvis studenten ikke finnes, jeg legger inn en sjekk for 404 fordi den er den 
err som jeg har størst mulighet for å få*/
            return res.status(404).json({sucess: false, error: 'Student not found' }); 
        }
    } catch (error) {
        res.status(500).json({sucess: false, error: 'Server Error' });
    }
};