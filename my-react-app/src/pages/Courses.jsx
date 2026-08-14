function Courses() {

  const courses = [

    {
      id: 1,
      icon: "💻",
      name: "MERN Stack",
      description:
        "Learn MongoDB, Express, React and Node.js to build full-stack web applications.",
      duration: "6 Months",
      students: 25,
      level: "Intermediate",
      color: "blue"
    },

    {
      id: 2,
      icon: "🎨",
      name: "Frontend Development",
      description:
        "Learn HTML, CSS, JavaScript and React to create modern responsive websites.",
      duration: "4 Months",
      students: 18,
      level: "Beginner",
      color: "green"
    },

    {
      id: 3,
      icon: "☕",
      name: "Java Full Stack",
      description:
        "Learn Java, Spring Boot, databases and frontend technologies for full-stack development.",
      duration: "6 Months",
      students: 20,
      level: "Advanced",
      color: "orange"
    },

    {
      id: 4,
      icon: "🐍",
      name: "Python Development",
      description:
        "Learn Python programming, APIs, databases and web application development.",
      duration: "5 Months",
      students: 15,
      level: "Intermediate",
      color: "purple"
    }

  ];


  const colorStyles = {

    blue: {
      icon: "bg-sky-100 text-sky-700",
      badge: "bg-sky-100 text-sky-700",
      top: "bg-sky-500"
    },

    green: {
      icon: "bg-emerald-100 text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
      top: "bg-emerald-500"
    },

    orange: {
      icon: "bg-orange-100 text-orange-700",
      badge: "bg-orange-100 text-orange-700",
      top: "bg-orange-500"
    },

    purple: {
      icon: "bg-purple-100 text-purple-700",
      badge: "bg-purple-100 text-purple-700",
      top: "bg-purple-500"
    }

  };


  return (

    <div className="w-full">


      {/* HEADER / COUNT */}

      <div className="mb-8 flex justify-between items-center">

        <h2 className="text-xl font-bold text-slate-700">
          Available Programs
        </h2>

        <div className="rounded-xl border border-sky-100 bg-sky-50 px-4 py-2 text-center">

          <p className="text-sm font-semibold text-slate-500">

            <span className="text-lg font-bold text-[#075985] mr-1">
              {courses.length}
            </span>

            courses

          </p>

        </div>

      </div>


      {/* COURSE GRID */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {courses.map((course) => {

          const styles =
            colorStyles[
              course.color
            ];

          return (

            <div
              key={course.id}
              className="group relative overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_4px_18px_rgba(7,89,133,0.03)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(7,89,133,0.06)]"
            >

              {/* TOP COLOR */}

              <div
                className={`h-1.5 ${styles.top}`}
              />


              <div className="p-5">


                {/* ICON */}

                <div className="mb-4">

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${styles.icon}`}
                  >
                    {course.icon}
                  </div>

                </div>


                {/* NAME */}

                <h2 className="text-lg font-bold text-[#075985]">
                  {course.name}
                </h2>


                {/* DESCRIPTION */}

                <p className="mt-2 min-h-[72px] text-xs leading-relaxed text-slate-500">
                  {course.description}
                </p>


                {/* DETAILS */}

                <div className="mt-4 border-t border-sky-50 pt-4">

                  <div className="rounded-lg bg-sky-50/50 p-2.5 flex items-center justify-between">

                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wide">
                      Duration
                    </p>

                    <p className="text-xs font-bold text-slate-700">
                      ⏱️ {course.duration}
                    </p>

                  </div>

                </div>


                {/* BUTTON */}

                <button
                  onClick={() =>
                    alert(
                      `${course.name}\n\nDuration: ${course.duration}`
                    )
                  }
                  className="mt-4 w-full rounded-xl bg-[#0284c7] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#075985] cursor-pointer"
                >
                  View Course
                </button>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}

export default Courses;