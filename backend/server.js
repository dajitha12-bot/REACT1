const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;

// ============================================================
// PATHS
// ============================================================

const DATA_FILE = path.join(
  __dirname,
  "data",
  "students.json"
);

const FRONTEND_PATH = path.join(
  __dirname,
  "..",
  "my-react-app",
  "dist"
);

const INDEX_FILE = path.join(
  FRONTEND_PATH,
  "index.html"
);

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());

app.use(express.json());

// ============================================================
// READ STUDENTS
// ============================================================

function readStudents() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }

    const data = fs.readFileSync(
      DATA_FILE,
      "utf-8"
    );

    return JSON.parse(data);
  } catch (error) {
    console.error(
      "Error reading students.json:",
      error
    );

    return [];
  }
}

// ============================================================
// WRITE STUDENTS
// ============================================================

function writeStudents(students) {
  try {
    const dataDirectory = path.dirname(
      DATA_FILE
    );

    if (!fs.existsSync(dataDirectory)) {
      fs.mkdirSync(dataDirectory, {
        recursive: true
      });
    }

    fs.writeFileSync(
      DATA_FILE,
      JSON.stringify(
        students,
        null,
        2
      ),
      "utf-8"
    );
  } catch (error) {
    console.error(
      "Error writing students.json:",
      error
    );

    throw error;
  }
}

// ============================================================
// API HOME
// ============================================================

app.get("/api", (req, res) => {
  res.json({
    message:
      "Student Management API is running",
    database: "JSON File"
  });
});

// ============================================================
// GET ALL STUDENTS
// ============================================================

app.get(
  "/api/students",
  (req, res) => {
    try {
      const students =
        readStudents();

      res.json(students);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to read students"
      });
    }
  }
);

// ============================================================
// GET STUDENT BY ID
// ============================================================

app.get(
  "/api/students/:id",
  (req, res) => {
    try {
      const students =
        readStudents();

      const id =
        Number(req.params.id);

      const student =
        students.find(
          (item) =>
            Number(item.id) === id
        );

      if (!student) {
        return res.status(404).json({
          message:
            "Student not found"
        });
      }

      res.json(student);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message:
          "Failed to get student"
      });
    }
  }
);

// ============================================================
// ADD STUDENT
// ============================================================

app.post(
  "/api/students",
  (req, res) => {
    try {
      const students =
        readStudents();

      const {
        rollNo,
        name,
        department,
        year,
        course,
        email
      } = req.body;

      if (
        !rollNo ||
        !name ||
        !department ||
        !year ||
        !course ||
        !email
      ) {
        return res.status(400).json({
          message:
            "All student fields are required"
        });
      }

      const duplicate =
        students.find(
          (student) =>
            String(student.rollNo)
              .toLowerCase() ===
            String(rollNo)
              .toLowerCase()
        );

      if (duplicate) {
        return res.status(400).json({
          message:
            "Roll number already exists"
        });
      }

      const newStudent = {
        id:
          students.length > 0
            ? Math.max(
                ...students.map(
                  (student) =>
                    Number(student.id)
                )
              ) + 1
            : 1,

        rollNo,
        name,
        department,
        year,
        course,
        email
      };

      students.push(newStudent);

      writeStudents(students);

      res.status(201).json(
        newStudent
      );
    } catch (error) {
      console.error(
        "Add student error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to add student"
      });
    }
  }
);

// ============================================================
// UPDATE STUDENT
// ============================================================

app.put(
  "/api/students/:id",
  (req, res) => {
    try {
      const students =
        readStudents();

      const id =
        Number(req.params.id);

      const index =
        students.findIndex(
          (student) =>
            Number(student.id) === id
        );

      if (index === -1) {
        return res.status(404).json({
          message:
            "Student not found"
        });
      }

      const {
        rollNo,
        name,
        department,
        year,
        course,
        email
      } = req.body;

      if (
        !rollNo ||
        !name ||
        !department ||
        !year ||
        !course ||
        !email
      ) {
        return res.status(400).json({
          message:
            "All student fields are required"
        });
      }

      const duplicate =
        students.find(
          (student) =>
            Number(student.id) !== id &&
            String(student.rollNo)
              .toLowerCase() ===
            String(rollNo)
              .toLowerCase()
        );

      if (duplicate) {
        return res.status(400).json({
          message:
            "Roll number already exists"
        });
      }

      students[index] = {
        id,
        rollNo,
        name,
        department,
        year,
        course,
        email
      };

      writeStudents(students);

      res.json(
        students[index]
      );
    } catch (error) {
      console.error(
        "Update student error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to update student"
      });
    }
  }
);

// ============================================================
// DELETE STUDENT
// ============================================================

app.delete(
  "/api/students/:id",
  (req, res) => {
    try {
      const students =
        readStudents();

      const id =
        Number(req.params.id);

      const filtered =
        students.filter(
          (student) =>
            Number(student.id) !== id
        );

      if (
        students.length ===
        filtered.length
      ) {
        return res.status(404).json({
          message:
            "Student not found"
        });
      }

      writeStudents(filtered);

      res.json({
        message:
          "Student deleted successfully"
      });
    } catch (error) {
      console.error(
        "Delete student error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to delete student"
      });
    }
  }
);

// ============================================================
// SERVE REACT FRONTEND
// ============================================================

console.log(
  "Frontend path:",
  FRONTEND_PATH
);

console.log(
  "Frontend exists:",
  fs.existsSync(FRONTEND_PATH)
);

console.log(
  "Index file exists:",
  fs.existsSync(INDEX_FILE)
);

if (fs.existsSync(FRONTEND_PATH)) {
  // Serve React static files
  app.use(
    express.static(FRONTEND_PATH)
  );

  // React SPA fallback
  app.use((req, res, next) => {
    // Never send React HTML for API routes
    if (
      req.path.startsWith("/api")
    ) {
      return next();
    }

    // Only send index.html if it exists
    if (fs.existsSync(INDEX_FILE)) {
      return res.sendFile(
        INDEX_FILE
      );
    }

    next();
  });
}

// ============================================================
// 404 HANDLER
// ============================================================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.path
  });
});

// ============================================================
// ERROR HANDLER
// ============================================================

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "Server error:",
      error
    );

    res.status(500).json({
      message:
        "Internal server error"
    });
  }
);

// ============================================================
// START SERVER
// ============================================================

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Server is running on port ${PORT}`
    );
  }
);