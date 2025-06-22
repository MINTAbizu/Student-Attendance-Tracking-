
import departmentmodel from '../model/department.js';

const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
         if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }


        const newdepartment=new departmentmodel({
            dep_name: name,
            dep_description: description
        });
        await newdepartment.save();
        return res.status(201).json({ message: "Department added successfully", data: newdepartment });

        // Validate input
       
        // Here you would typically save the department to the database
        // For example:
        // const newDepartment = await Department.create({ name, description });

        // Simulating a successful response
        res.status(201).json({ message: "Department added successfully", data: { name, description } });
    } catch (error) {
        console.error("Error adding department:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}




const listDepartments = async (req, res) => {
  try {
    const departments = await departmentmodel.find(); // Fetch all departments
    res.status(200).json({ ok: true, departments });
  } catch (error) {
    console.error("Error fetching departments:", error);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

const updateDepartment = async (req, res) => {
  const { dep_name, dep_description } = req.body;
  const dep = await departmentmodel.findByIdAndUpdate(
    req.params.id,
    { dep_name, dep_description },
    { new: true }
  );
  res.json({ message: 'Updated', department: dep });
};

export  {addDepartment ,listDepartments,updateDepartment};