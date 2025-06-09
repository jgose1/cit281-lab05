// Include express module and create an instance
const express = require('express');
const app = express();

// Set IP and port
const listenPort = 8080;
const listenIP = '127.0.0.1';

// Middleware to parse JSON bodies
app.use(express.json());

// === STUDENTS DATA ===
const students = [
  { id: 1, last: "Last1", first: "First1" },
  { id: 2, last: "Last2", first: "First2" },
  { id: 3, last: "Last3", first: "First3" },
];

// === GET: All Students ===
app.get('/cit/student', (req, res) => {
  res.status(200).json(students);
});

// === GET: Single Student by ID ===
app.get('/cit/student/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let result;

  for (const student of students) {
    if (student.id === id) {
      result = student;
      break;
    }
  }

  if (result) {
    res.status(200).json(result);
  } else {
    res.status(404).json({ error: "Student not found" });
  }
});

// === POST: Add New Student ===
app.post('/cit/student', (req, res) => {
  const { first, last } = req.body;

  if (!first || !last) {
    return res.status(400).json({ error: "Missing first or last name" });
  }

  const newId = students.length ? students[students.length - 1].id + 1 : 1;
  const newStudent = { id: newId, first, last };
  students.push(newStudent);

  res.status(201).json(newStudent);
});

// === 404 Handler ===
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', statusCode: 404 });
});

// === Start Server ===
app.listen(listenPort, listenIP, () => {
  console.log(`Server running at http://${listenIP}:${listenPort}`);
});
