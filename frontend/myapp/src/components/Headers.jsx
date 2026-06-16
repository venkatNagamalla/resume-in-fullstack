import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { TbMenuDeep } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

const navs = [
  {
    id: 1,
    path: "/",
    label: "Home",
  },
  {
    id: 2,
    path: "/dashboard",
    label: "Dashboard",
  },
  { id: 3, path: "/past-analyses", label: "Past Analyses" },
];

const Headers = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);
  const [logout, setLogout] = useState(false);

  const handleSideBar = () => setSidebar((preState) => !preState);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderMobileView = () => (
    <div className="flex items-center md:hidden h-full justify-between">
      <h2 className="text-[#B500B2] text-lg font-semibold head-font">
        Resume In
      </h2>
      <button className="cursor-pointer" onClick={handleSideBar}>
        {sidebar ? <IoMdClose /> : <TbMenuDeep />}
      </button>
      <nav
        className={`w-[60%] border-black bg-white border transition-all duration-300 ease-in-out flex flex-col  p-2 h-[90vh] fixed ${sidebar ? "right-0" : "-right-full"} top-13`}
      >
        <ul className="h-[90%]">
          {navs.map((eachNav) => (
            <li key={eachNav.id} className="mb-2">
              <NavLink
                to={eachNav.path}
                className={({ isActive }) =>
                  `block px-4 py-3 border border-black cursor-pointer ${
                    isActive
                      ? "bg-[#B500B2] text-white border-0"
                      : "bg-white text-black"
                  }`
                }
              >
                {eachNav.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setLogout(true)}
          className="bg-red-500 px-2 py-2 text-white rounded flex items-center justify-center cursor-pointer"
        >
          Logout
          <MdLogout className="ml-1" />
        </button>
      </nav>
    </div>
  );

  const renderLogoutView = () => (
    <div className="bg-gray-100 border border-gray-800 w-[90%] md:w-[60%] lg:w-[40%] h-50 flex flex-col justify-center items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 shadow-xl rounded">
      <h1 className="text-center font-normal text-xl">
        Are you sure! want's to logout?
      </h1>
      <div className="flex items-center w-[50%] justify-around mt-5">
        <button
          onClick={() => setLogout(false)}
          className="border border-black rounded cursor-pointer px-4 py-1"
        >
          No
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white cursor-pointer rounded px-4 py-1"
        >
          Yes
        </button>
      </div>
    </div>
  );

  const renderLapTopView = () => (
    <div className="hidden md:flex items-center h-full px-3 justify-between">
      <div className="w-[20%]">
        <h2 className="head-font text-[#B500B2] font-semibold text-lg">
          Resume In
        </h2>
      </div>

      <nav className="w-[30%]">
        <ul className="flex items-center justify-between w-full">
          <li className="font-semibold cursor-pointer px-3">
            <NavLink to="/">Home</NavLink>
          </li>
          <li className="font-semibold cursor-pointer px-3">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>

          <li className="font-semibold cursor-pointer px-3">
            <NavLink to="/past-analyses">Past Analyses</NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex items-center w-[20%]  justify-end">
        <button
          onClick={() => setLogout(true)}
          className="bg-gray-200 px-3 py-2 rounded-2xl cursor-pointer"
        >
          <MdLogout />
        </button>
      </div>
    </div>
  );

  return (
    <header className="h-12 fixed top-0 left-0 right-0 bg-white shadow-md px-2">
      {renderMobileView()}
      {renderLapTopView()}
      {logout && <div>{renderLogoutView()}</div>}
    </header>
  );
};

export default Headers;
