import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";

function PageLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = ["/", "/students", "/courses"];
  const currentIndex = routes.indexOf(location.pathname);

  const handlePrev = () => {
    if (currentIndex > 0) {
      navigate(routes[currentIndex - 1]);
    } else {
      navigate(routes[routes.length - 1]); // Loop to end
    }
  };

  const handleNext = () => {
    if (currentIndex < routes.length - 1) {
      navigate(routes[currentIndex + 1]);
    } else {
      navigate(routes[0]); // Loop to start
    }
  };

  const getHeader = () => {
    if (location.pathname === "/") {
      return (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#075985] tracking-tight md:text-4xl">
            Student Management
          </h1>
          <p className="mt-1 text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Dashboard
          </p>
        </div>
      );
    } else if (location.pathname === "/students") {
      return (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#075985] tracking-tight md:text-4xl">
            Student Management
          </h1>
        </div>
      );
    } else if (location.pathname === "/courses") {
      return (
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#075985] tracking-tight md:text-4xl">
            Student Management
          </h1>
          <p className="mt-1 text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Courses
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-8 md:px-8 min-h-[calc(100vh-76px)]">
      
      {/* CENTERED CARD CONTAINER */}
      <div className="w-full overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 md:p-10 shadow-[0_8px_30px_rgba(7,89,133,0.06)]">
        {getHeader()}
        {children}
      </div>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen bg-[#e6f6ff]">

        <Navbar />

        <main>
          <PageLayout>
            <Routes>

              <Route
                path="/"
                element={<Dashboard />}
              />

              <Route
                path="/students"
                element={<Students />}
              />

              <Route
                path="/courses"
                element={<Courses />}
              />

            </Routes>
          </PageLayout>
        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;