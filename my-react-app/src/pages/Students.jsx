import { useEffect, useState } from "react";

import StudentForm from "../components/StudentForm";
import StudentList from "../components/StudentList";


const API_URL =
  "http://localhost:5000/api/students";


function Students() {

  const [students, setStudents] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [editingStudent, setEditingStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ============================================================
  // GET STUDENTS
  // ============================================================

  const fetchStudents = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await fetch(API_URL);

      if (!response.ok) {

        throw new Error(
          "Failed to fetch students"
        );

      }

      const data =
        await response.json();

      setStudents(data);

    }
    catch (error) {

      console.error(error);

      setError(
        "Unable to connect to backend. Make sure the server is running."
      );

    }
    finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchStudents();

  }, []);


  // ============================================================
  // ADD STUDENT
  // ============================================================

  const addStudent = async (student) => {

    try {

      setError("");

      const response =
        await fetch(API_URL, {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(student)

        });


      if (!response.ok) {

        const result =
          await response.json();

        throw new Error(
          result.message ||
          "Failed to add student"
        );

      }


      const data =
        await response.json();


      setStudents((prev) => [
        ...prev,
        data
      ]);

      alert(
        "Student added successfully!"
      );

    }
    catch (error) {

      console.error(error);

      alert(
        error.message ||
        "Failed to add student"
      );

    }

  };


  // ============================================================
  // DELETE STUDENT
  // ============================================================

  const deleteStudent = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this student?"
      );


    if (!confirmDelete) {
      return;
    }


    try {

      setError("");

      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE"
          }
        );


      if (!response.ok) {

        throw new Error(
          "Failed to delete student"
        );

      }


      setStudents((prev) =>
        prev.filter(
          (student) =>
            student.id !== id
        )
      );

    }
    catch (error) {

      console.error(error);

      alert(
        "Failed to delete student"
      );

    }

  };


  // ============================================================
  // EDIT
  // ============================================================

  const editStudent = (student) => {

    setEditingStudent(student);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


  // ============================================================
  // UPDATE
  // ============================================================

  const updateStudent =
    async (
      id,
      updatedStudent
    ) => {

      try {

        setError("");

        const response =
          await fetch(
            `${API_URL}/${id}`,
            {

              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(
                  updatedStudent
                )

            }
          );


        if (!response.ok) {

          const result =
            await response.json();

          throw new Error(
            result.message ||
            "Failed to update student"
          );

        }


        const data =
          await response.json();


        setStudents((prev) =>
          prev.map(
            (student) =>
              student.id === id
                ? data
                : student
          )
        );


        setEditingStudent(null);


        alert(
          "Student updated successfully!"
        );

      }
      catch (error) {

        console.error(error);

        alert(
          error.message ||
          "Failed to update student"
        );

      }

    };


  // ============================================================
  // CANCEL
  // ============================================================

  const cancelEdit = () => {

    setEditingStudent(null);

  };


  // ============================================================
  // SEARCH
  // ============================================================

  const searchText =
    search.toLowerCase().trim();


  const filteredStudents =
    students.filter((student) => {

      return (

        String(
          student.rollNo || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          student.name || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          student.department || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          student.year || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          student.course || ""
        )
          .toLowerCase()
          .includes(searchText)

        ||

        String(
          student.email || ""
        )
          .toLowerCase()
          .includes(searchText)

      );

    });


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <div className="flex items-center justify-center p-12">

        <div className="text-center">

          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-sky-100 border-t-sky-600"></div>

          <h2 className="font-bold text-[#075985]">
            Loading Students...
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Please wait
          </p>

        </div>

      </div>

    );

  }


  // ============================================================
  // PAGE
  // ============================================================

  return (

    <div className="w-full">


      {/* ERROR */}

      {error && (

        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">

          <span className="text-xl">
            ⚠️
          </span>

          <div>

            <p className="font-bold">
              Connection Error
            </p>

            <p className="text-sm">
              {error}
            </p>

          </div>

        </div>

      )}


      {/* SEARCH */}

      <div className="mb-6 relative w-full">

        <input
          type="text"
          placeholder="Search Student"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full rounded-xl border border-sky-200 bg-white py-3.5 px-4 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100 placeholder:text-slate-400"
        />

      </div>


      {/* FORM */}

      <div className="mb-8">

        <StudentForm

          addStudent={addStudent}

          editingStudent={
            editingStudent
          }

          updateStudent={
            updateStudent
          }

          cancelEdit={
            cancelEdit
          }

        />

      </div>


      {/* LIST */}

      <StudentList

        students={
          filteredStudents
        }

        deleteStudent={
          deleteStudent
        }

        editStudent={
          editStudent
        }

      />

    </div>

  );
}

export default Students;