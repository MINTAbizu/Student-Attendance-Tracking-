import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connecttodb from './db/db.js';
import userregistration from './userseed.js';
import logiroute from './route.js/authroute.js';
import departmentroute from './route.js/department.route.js';
import employeeRoutes from './route.js/employee.route.js'; // <-- use default import

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

const startServer = async () => {
  await connecttodb();
  await userregistration();

  app.use('/api/auth', logiroute);
  app.use(departmentroute);
  app.use(employeeRoutes); // <-- use the imported router

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};


startServer();