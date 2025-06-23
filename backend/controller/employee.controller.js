import Employee from '../model/employee.js';
import user from '../model/usermodel.js';
import multer from 'multer';
import bcrypt from 'bcrypt';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
    try {
        const {
            employeeid,
            name,
            password,
            email,
            phone,
            department,
            position,
            address,
            dateOfBirth,
            salary,
            role
        } = req.body;

        const userexists = await user.findOne({ email });
        if (userexists) {
            res.status(400).json({ message: 'User already registered' });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser = new user({
            name,
            email,
            role,
            password: hashedPassword,
            image: req.file ? req.file.path : null
        });
        await newuser.save();

        const newEmployee = new Employee({
            userId: newuser._id,
            employeeid,
            name,
            email,
            phone,
            department,
            position,
            address,
            dateOfBirth,
            salary,
            role,
            password: hashedPassword, // Only if you want to store it here too
            image: req.file ? req.file.path : null
        });
        await newEmployee.save();

        res.status(201).json({ message: 'Employee registered successfully', employee: newEmployee });
    } catch (error) {
        console.error('Error adding employee:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

    // const employees = await Employee.find().populate('userId', 'name email role image');
    // res.status(200).json(employees);

const  getemployee = async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', 'name email role image');
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { addEmployee, upload , getemployee };