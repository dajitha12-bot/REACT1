import { useEffect, useState } from "react";

function StudentForm({
  addStudent,
  editingStudent,
  updateStudent,
  cancelEdit
}) {

  const emptyForm = {
    rollNo: "",
    name: "",
    department: "",
    year: "",
    course: "",
    email: ""
  };

  const [form, setForm] =
    useState(emptyForm);

  const [errors, setErrors] =
    useState({});


  // Fill form when editing

  useEffect(() => {

    if (editingStudent) {

      setForm({
        rollNo: editingStudent.rollNo || "",
        name: editingStudent.name || "",
        department: editingStudent.department || "",
        year: editingStudent.year || "",
        course: editingStudent.course || "",
        email: editingStudent.email || ""
      });

      setErrors({});
    }

  }, [editingStudent]);


  // Handle input

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // Validation

  const validate = () => {

    const newErrors = {};

    if (!form.rollNo.trim()) {
      newErrors.rollNo =
        "Roll number is required";
    }

    if (!form.name.trim()) {
      newErrors.name =
        "Student name is required";
    }

    if (!form.department.trim()) {
      newErrors.department =
        "Department is required";
    }

    if (!form.year.trim()) {
      newErrors.year =
        "Year is required";
    }

    if (!form.course.trim()) {
      newErrors.course =
        "Course is required";
    }

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required";
    }
    else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      newErrors.email =
        "Enter a valid email";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  // Submit

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    if (editingStudent) {

      await updateStudent(
        editingStudent.id,
        form
      );

    } else {

      await addStudent(form);

    }

    setForm(emptyForm);
    setErrors({});

  };


  const inputClass =
    "w-full rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100";


  const labelClass =
    "mb-1 block text-xs font-bold text-slate-500 uppercase tracking-wide";


  return (

    <div className="rounded-2xl border border-sky-100 bg-sky-50/30 p-5">

      {/* FORM HEADER */}

      <div className="mb-4 flex items-center justify-between">

        <div>

          <h2 className="text-lg font-bold text-[#075985]">

            {editingStudent
              ? "Edit Student"
              : "Add New Student"}

          </h2>

          <p className="text-xs text-slate-400">

            {editingStudent
              ? "Update student information"
              : "Enter student details below"}

          </p>

        </div>

      </div>


      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3"
      >

        {/* NAME */}

        <div>

          <label className={labelClass}>
            Student Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter student name"
            className={inputClass}
          />

          {errors.name && (
            <p className="mt-1 text-[10px] font-medium text-red-500">
              {errors.name}
            </p>
          )}

        </div>


        {/* COURSE */}

        <div>

          <label className={labelClass}>
            Course
          </label>

          <select
            name="course"
            value={form.course}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">
              Select Course
            </option>

            <option value="MERN Stack">
              MERN Stack
            </option>

            <option value="Frontend Development">
              Frontend Development
            </option>

            <option value="Java Full Stack">
              Java Full Stack
            </option>

            <option value="Python Development">
              Python Development
            </option>

          </select>

          {errors.course && (
            <p className="mt-1 text-[10px] font-medium text-red-500">
              {errors.course}
            </p>
          )}

        </div>


        {/* EMAIL */}

        <div>

          <label className={labelClass}>
            Email
          </label>

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="student@example.com"
            className={inputClass}
          />

          {errors.email && (
            <p className="mt-1 text-[10px] font-medium text-red-500">
              {errors.email}
            </p>
          )}

        </div>


        {/* ROLL NO */}

        <div>

          <label className={labelClass}>
            Roll Number
          </label>

          <input
            name="rollNo"
            value={form.rollNo}
            onChange={handleChange}
            placeholder="Example: IT101"
            className={inputClass}
          />

          {errors.rollNo && (
            <p className="mt-1 text-[10px] font-medium text-red-500">
              {errors.rollNo}
            </p>
          )}

        </div>


        {/* DEPARTMENT */}

        <div>

          <label className={labelClass}>
            Department
          </label>

          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            placeholder="Example: Info Tech"
            className={inputClass}
          />

          {errors.department && (
            <p className="mt-1 text-[10px] font-medium text-red-500">
              {errors.department}
            </p>
          )}

        </div>


        {/* YEAR */}

        <div>

          <label className={labelClass}>
            Year
          </label>

          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            className={inputClass}
          >

            <option value="">
              Select Year
            </option>

            <option value="1st Year">
              1st Year
            </option>

            <option value="2nd Year">
              2nd Year
            </option>

            <option value="3rd Year">
              3rd Year
            </option>

            <option value="4th Year">
              4th Year
            </option>

          </select>

          {errors.year && (
            <p className="mt-1 text-[10px] font-medium text-red-500">
              {errors.year}
            </p>
          )}

        </div>


        {/* BUTTONS */}

        <div className="flex items-end gap-3 sm:col-span-2 md:col-span-3 mt-2">

          <button
            type="submit"
            className="rounded-lg bg-[#0284c7] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#075985] cursor-pointer"
          >

            {editingStudent
              ? "Update Student"
              : "Add Student"}

          </button>


          {editingStudent && (

            <button
              type="button"
              onClick={() => {
                setForm(emptyForm);
                setErrors({});
                cancelEdit();
              }}
              className="rounded-lg border border-slate-200 bg-white px-6 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>

          )}

        </div>

      </form>

    </div>
  );
}

export default StudentForm;