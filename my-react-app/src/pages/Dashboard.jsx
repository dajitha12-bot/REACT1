import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL =
  "http://localhost:5000/api/students";

function Dashboard() {

  const [studentCount, setStudentCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    fetch(API_URL)

      .then((response) => {

        if (!response.ok) {
          throw new Error();
        }

        return response.json();

      })

      .then((data) => {

        setStudentCount(data.length);
        setLoading(false);

      })

      .catch(() => {

        setLoading(false);

      });

  }, []);


  return (

    <div className="w-full">


      {/* STATISTICS */}

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">


        {/* STUDENTS */}

        <div className="group rounded-2xl border border-sky-100 border-l-[6px] border-l-[#0284c7] bg-white p-6 shadow-[0_4px_18px_rgba(7,89,133,0.04)] transition hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(7,89,133,0.08)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Students
              </p>

              <h2 className="mt-2 text-4xl font-extrabold text-[#075985]">

                {loading
                  ? "..."
                  : studentCount}

              </h2>

            </div>


            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-2xl transition group-hover:bg-sky-200">
              🎓
            </div>

          </div>

        </div>


        {/* COURSES */}

        <div className="group rounded-2xl border border-sky-100 border-l-[6px] border-l-cyan-500 bg-white p-6 shadow-[0_4px_18px_rgba(7,89,133,0.04)] transition hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(7,89,133,0.08)]">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Courses
              </p>

              <h2 className="mt-2 text-4xl font-extrabold text-[#075985]">
                4
              </h2>

            </div>


            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl transition group-hover:bg-cyan-200">
              📚
            </div>

          </div>

        </div>

      </div>


      {/* QUICK NAVIGATION */}

      <div>

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-slate-700 tracking-tight">
            Quick Navigation
          </h2>

        </div>


        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">


          {/* STUDENTS */}

          <Link
            to="/students"
            className="group flex flex-col justify-between rounded-2xl border border-sky-100 bg-[#e0f2fe] p-6 transition hover:-translate-y-1 hover:bg-[#bae6fd]"
          >

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                🎓
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#075985]">
                Students
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-sky-800">
                Add, edit, delete and search student records.
              </p>

            </div>

            <div className="mt-5 flex items-center justify-end">
              <span className="text-xl font-bold text-sky-600 transition group-hover:translate-x-1">
                →
              </span>
            </div>

          </Link>


          {/* COURSES */}

          <Link
            to="/courses"
            className="group flex flex-col justify-between rounded-2xl border border-sky-100 bg-[#e2f1f8] p-6 transition hover:-translate-y-1 hover:bg-[#cfe2fe]"
          >

            <div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                📚
              </div>

              <h3 className="mt-4 text-lg font-bold text-[#075985]">
                Courses
              </h3>

              <p className="mt-1.5 text-xs leading-relaxed text-[#075985]">
                Explore available courses and learning programs.
              </p>

            </div>

            <div className="mt-5 flex items-center justify-end">
              <span className="text-xl font-bold text-sky-600 transition group-hover:translate-x-1">
                →
              </span>
            </div>

          </Link>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;