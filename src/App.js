import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./Home";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ApplyLeavePage from "./components/ApplyLeavePage";
import LeaveStatusPage from "./components/LeaveStatusPage";
import AdminLogin from "./admin/AdminLogin";
import AdminDashBoard from "./admin/AdminDashBoard";
import AdminHome from './admin/AdminHome';
import LeaveRequests from './admin/LeaveRequests';
import Calendar from "./admin/Calender";
import Events from "./admin/Events";
import CombinedAttendance from "./admin/CombinedAttendance";


function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashBoard></DashBoard>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/apply"
            element={<ApplyLeavePage></ApplyLeavePage>}
          ></Route>
          <Route
            path="/status"
            element={<LeaveStatusPage></LeaveStatusPage>}
          ></Route>

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashBoard />}>
    <Route index element={<AdminHome />} /> {/* /admin */}
    <Route path="leaves" element={<LeaveRequests />} /> {/* /admin/leaves */}
    <Route path="calendar" element={<Calendar />} /> {/* /admin/calendar */}
    <Route path="events" element={<Events />} /> {/* /admin/events */}
    <Route path="/admin/attendance" element={<CombinedAttendance />} />
    <Route path="/admin/calender" element={<Calendar></Calendar>} />
    <Route path="/admin/events" element={<Events></Events>} />


  </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
