function StudentList({
  students,
  deleteStudent,
  editStudent
}) {

  if (students.length === 0) {

    return (

      <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-10 text-center">

        <div className="mb-3 text-5xl">
          🔎
        </div>

        <h3 className="text-lg font-bold text-slate-700">
          No Students Found
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Try changing your search or add a new student.
        </p>

      </div>

    );
  }


  return (

    <div className="w-full">

      {/* HEADER */}

      <div className="mb-4">

        <h2 className="text-xl font-bold text-slate-700">
          Students
        </h2>

        <p className="text-xs text-slate-400">
          {students.length} student{students.length !== 1 ? "s" : ""} registered
        </p>

      </div>


      {/* TABLE CONTAINER */}

      <div className="overflow-hidden rounded-xl border border-sky-100 bg-white shadow-sm">

        {/* DESKTOP TABLE */}

        <div className="hidden overflow-x-auto md:block">

          <table className="w-full border-collapse">

            <thead className="bg-[#075985] text-white">

              <tr>

                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Roll No
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Student Name
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Department
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Year
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Course
                </th>

                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider">
                  Email
                </th>

                <th className="px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-sky-50">

              {students.map((student) => (

                <tr
                  key={student.id}
                  className="transition hover:bg-sky-50/40"
                >

                  <td className="px-5 py-4 text-sm font-semibold text-[#075985] whitespace-nowrap">

                    <span className="rounded-md bg-sky-50 px-2.5 py-1 text-xs font-bold border border-sky-100">
                      {student.rollNo}
                    </span>

                  </td>


                  <td className="px-5 py-4 whitespace-nowrap">

                    <div className="flex items-center gap-3">

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-[#0284c7]">
                        {student.name
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                      <span className="text-sm font-semibold text-slate-700">
                        {student.name}
                      </span>

                    </div>

                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {student.department}
                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {student.year}
                  </td>


                  <td className="px-5 py-4 whitespace-nowrap">

                    <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 border border-cyan-100">
                      {student.course}
                    </span>

                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600 whitespace-nowrap">
                    {student.email}
                  </td>


                  <td className="px-5 py-4 whitespace-nowrap">

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          editStudent(student)
                        }
                        className="rounded-lg bg-sky-50 border border-sky-100 px-3 py-1.5 text-xs font-bold text-[#075985] transition hover:bg-sky-100 cursor-pointer"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteStudent(student.id)
                        }
                        className="rounded-lg bg-red-50 border border-red-100 px-3 py-1.5 text-xs font-bold text-red-600 transition hover:bg-red-100 cursor-pointer"
                      >
                        🗑️ Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* MOBILE CARDS (Maintains clean presentation on mobile) */}

        <div className="space-y-4 p-4 md:hidden bg-sky-50/20">

          {students.map((student) => (

            <div
              key={student.id}
              className="rounded-xl border border-sky-100 bg-white p-4"
            >

              <div className="mb-3 flex items-center gap-3">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 font-bold text-[#0284c7]">
                  {student.name
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <div>

                  <h3 className="font-bold text-slate-700 leading-tight">
                    {student.name}
                  </h3>

                  <p className="text-[10px] font-semibold text-[#075985]">
                    {student.rollNo}
                  </p>

                </div>

              </div>


              <div className="grid grid-cols-2 gap-3 text-xs border-t border-sky-50 pt-3 mb-3">

                <div>

                  <span className="block text-[9px] uppercase font-bold text-slate-400">
                    Course
                  </span>

                  <span className="font-semibold text-slate-700">
                    {student.course}
                  </span>

                </div>


                <div>

                  <span className="block text-[9px] uppercase font-bold text-slate-400">
                    Email
                  </span>

                  <span className="font-semibold text-slate-700 break-all">
                    {student.email}
                  </span>

                </div>


                <div>

                  <span className="block text-[9px] uppercase font-bold text-slate-400">
                    Department
                  </span>

                  <span className="font-semibold text-slate-700">
                    {student.department}
                  </span>

                </div>


                <div>

                  <span className="block text-[9px] uppercase font-bold text-slate-400">
                    Year
                  </span>

                  <span className="font-semibold text-slate-700">
                    {student.year}
                  </span>

                </div>

              </div>


              <div className="flex gap-2 border-t border-sky-50 pt-3">

                <button
                  onClick={() =>
                    editStudent(student)
                  }
                  className="flex-1 rounded-lg bg-sky-50 border border-sky-100 py-2 text-xs font-bold text-[#075985] transition hover:bg-sky-100 cursor-pointer"
                >
                  ✏️ Edit
                </button>

                <button
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                  className="flex-1 rounded-lg bg-red-50 border border-red-100 py-2 text-xs font-bold text-red-600 transition hover:bg-red-100 cursor-pointer"
                >
                  🗑️ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default StudentList;