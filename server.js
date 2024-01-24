const express = require('express');
const bodyParser= require('body-parser');
const app=express();
app.use(bodyParser.json());
app.listen(3001,()=>{
    console.log("server runing in 3001 port");
});
app.get('/api/getMessage',(req,res)=>{
    let message='haye.... I am running on get command';
    res.json(message);
});
//array list
let employees=[
    {
        Id: 1,
        Name: "chaithu",
        Designation: "Software Engineer",
        Age: 21,
        Phone: "123-456-7890",
        Salary: 6000,
        NativeAddress: "nellore",
        PermanentAddress: "nelllore",
        OfcName: "teamx",
        OfcBranchLocation: "Headquarters",
        ReportingManagerName:  "rajskeharManager",
        CurrentWorkingProjectName: "Project A"
    },
    {
        Id: 2,
        Name: "chaitanya",
        Designation: "Software developer",
        Age: 24,
        Phone: "0987-654-321",
        Salary: 90000,
        NativeAddress: "chennai",
        PermanentAddress: "chennai",
        OfcName: "teamx",
        OfcBranchLocation: "Headquarters",
        ReportingManagerName:  "aliaManager",
        CurrentWorkingProjectName: "Project B" 
    },
    {
        Id: 3,
        Name: "naina",
        Designation: "Software Engineer",
        Age: 21,
        Phone: "123-456-7890",
        Salary: 6000,
        NativeAddress: "chennai",
        PermanentAddress: "chennai",
        OfcName: "teamx",
        OfcBranchLocation: "Headquarters",
        ReportingManagerName:  "aliaManager",
        CurrentWorkingProjectName: "Project D"
    },
    {
        Id: 4,
        Name: "jana",
        Designation: "software developer",
        Age: 21,
        Phone: "123-456-7890",
        Salary: 6000,
        NativeAddress: "nellore",
        PermanentAddress: "nelllore",
        OfcName: "teamx",
        OfcBranchLocation: "Headquarters",
        ReportingManagerName:  "rajskeharManager",
        CurrentWorkingProjectName: "Project C"
    },
    {
        Id: 5,
        Name: "lakshmi",
        Designation: "data analyst",
        Age: 21,
        Phone: "123-456-7890",
        Salary: 100000,
        NativeAddress: "hyderabad",
        PermanentAddress: "hyderabad",
        OfcName: "teamx",
        OfcBranchLocation: "Headquarters",
        ReportingManagerName:  "rajskeharManager",
        CurrentWorkingProjectName: "Project C"
    }
];
//get all employees
app.get('/api/getAllemployees',(req,res)=>{
    res.json(employees);
});
//add a employee
app.post('/api/newemployee',(req,res)=>{
    const newemployee =req.body
    console.log(newemployee);
    employees.push(newemployee);
    res.json(employees);
});
//update  employee
app.put('/api/employee/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);//converting to integer
    const index = employees.findIndex(item => item.Id === employeeId);//given id matches the employee id
    if (index !== -1) {
        employees[index] = { ...employees[index], ...req.body };
        res.json(employees[index]);  
    } else {
        res.status(404).json({ errorMessage: 'Employee not found in the server!!!' });
    }
});
//delete  employee
app.delete('/api/employee/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const updatedEmployees = employees.filter(item => item.Id !== employeeId);
    if (updatedEmployees.length < employees.length) {
        res.json({ success: true, message: 'Employee deleted successfully!' });
        employees = updatedEmployees; 
    } else {
        res.status(404).json({ errorMessage: 'Employee not found in the server!!!' });
    }
});
app.get('/api/getEmployee/:id', (req, res) => {
    const employeeId = parseInt(req.params.id);
    const employee = employees.find(item => item.Id === employeeId);

    if (employee) {
        res.json(employee);
    } else {
        res.status(404).json({ errorMessage: 'Employee not found in the server!!!' });
    }
});
//get the employee who has same manger
app.get('/api/getEmployeesByManager/:managerName', (req, res) => {

    const givenManagerName = req.params.managerName;

    const employeesUnderManager = employees.filter(item => item.ReportingManagerName === givenManagerName);

    if (employeesUnderManager.length > 0) {
        res.json(employeesUnderManager);
    } else {
        res.status(404).json({ errorMessage: 'No employees found under the specified manager!!!' });
    }
});
//get all employees based on salary
app.get('/api/getEmployeesBySalary/:salary', (req, res) => {
    const givenSalary = parseInt(req.params.salary);

    if (isNaN(givenSalary)) {
        return res.status(400).json({ errorMessage: 'Invalid salary value provided!' });
    }

    const employeesWithSalary = employees.filter(item => item.Salary === givenSalary);

    if (employeesWithSalary.length > 0) {
        res.json(employeesWithSalary);
    } else {
        res.status(404).json({ errorMessage: 'No employees found under the specified salary!!!' });
    }
});
//get all employees usin officename and branch location
app.get('/api/getEmployeesByOffice/:officeName/:branchLocation', (req, res) => {
    const givenOfficeName = req.params.officeName;
    const givenBranchLocation = req.params.branchLocation;

    const employeesInOffice = employees.filter(item => 
        item.OfcName === givenOfficeName && item.OfcBranchLocation === givenBranchLocation
    );

    if (employeesInOffice.length > 0) {
        res.json(employeesInOffice);
    } else {
        res.status(404).json({ errorMessage: 'No employees found in the specified office and branch location!!!' });
    }
});

