import { NavLink } from "react-router-dom";

function Navbar() {

  const navClass = ({ isActive }) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-white text-[#075985] shadow-sm"
        : "text-white hover:bg-[#0e7490]"
    }`;

  return (

    <header className="sticky top-0 z-50 w-full bg-[#075985] text-white shadow-[0_3px_12px_rgba(7,89,133,0.25)]">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* LOGO */}

        <NavLink
          to="/"
          className="flex items-center gap-3"
        >

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">
            🎓
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-wide">
              Student Management
            </h1>

            <p className="text-xs text-sky-100">
              Academic Management System
            </p>
          </div>

        </NavLink>


        {/* NAVIGATION */}

        <nav className="hidden items-center gap-2 md:flex">

          <NavLink
            to="/"
            className={navClass}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/students"
            className={navClass}
          >
            Students
          </NavLink>

          <NavLink
            to="/courses"
            className={navClass}
          >
            Courses
          </NavLink>

        </nav>

      </div>

    </header>
  );
}

export default Navbar;