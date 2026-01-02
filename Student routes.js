const express = require('express');
const router = express.Router();

// Multiple students data
let students = [
    { id: 1, name: "Arun", age: 20, roll: "ECE101", department: "ECE" },
    { id: 2, name: "Divya", age: 21, roll: "CSE102", department: "CSE" },
    { id: 3, name: "Karthik", age: 22, roll: "IT103", department: "IT" }
];

// READ - Get all students
router.get('/', (req, res) => {
    res.json(students);
});

// READ - Get single student
router.get('/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);
    student
        ? res.json(student)
        : res.status(404).json({ message: "Student not found" });
});

// CREATE - Add student
router.post('/', (req, res) => {
    students.push(req.body);
    res.status(201).json({
        message: "Student added",
        students
    });
});

// UPDATE - Single student
router.put('/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }
    students[index] = { ...students[index], ...req.body };
    res.json({
        message: "Student updated",
        students
    });
});

// UPDATE - Multiple students
router.put('/', (req, res) => {
    req.body.forEach(update => {
        const index = students.findIndex(s => s.id === update.id);
        if (index !== -1) {
            students[index] = { ...students[index], ...update };
        }
    });
    res.json({
        message: "Multiple students updated",
        students
    });
});

// DELETE - Remove student
router.delete('/:id', (req, res) => {
    students = students.filter(s => s.id != req.params.id);
    res.json({
        message: "Student deleted",
        students
    });
});

module.exports = router;
