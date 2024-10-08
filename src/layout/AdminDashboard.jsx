import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";


const AdminDashboard = () => {
    return (
        <>
            {/* Navbar goes here */}

      <div className="grid grid-cols-12 h-screen">
                <div className="col-span-2">
                    <Sidebar></Sidebar>
                </div>
        {/* Main content */}
      <div className="col-span-10 w-full">
          <Outlet></Outlet>
        </div>
    </div>
        </>
    );
};

export default AdminDashboard;