import { FunctionComponent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import { UserContext } from "../../hooks/context/UserContext";
import User from "../../interfaces/User";
import { getAllUsers, getUserById } from "../../services/userServices";

import AdminStats from "./AdminStats";
import CRM from "./CRM/CRM";

interface AdminPanelProps {}

const AdminPanel: FunctionComponent<AdminPanelProps> = () => {
  let userContext = useContext(UserContext);
  let themeContext = useContext(ThemeContext);
  let [customers, setCustomers] = useState<User[]>([]);
  let [user, setUser] = useState<User>();
  useEffect(() => {
    let userId = JSON.parse(
      sessionStorage.getItem("userData") as string
    )?.userId;
    getUserById(userId)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
    getAllUsers()
      .then((res) => {
        setCustomers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {userContext.isAdmin ? (
        <>
          <div
            className={`container bg-${
              themeContext.isLight ? "light" : "dark text-light"
            } h-100 py-5`}
          >
            <h2 className="pt-5">Welcome back, {user?.name}</h2>
            <AdminStats customers={customers.length} />
            <div className="container mt-3">
              <h6>TechIT Customers:</h6>
              <CRM customers={customers} />
            </div>
          </div>
        </>
      ) : (
        <p>test</p>
      )}
    </>
  );
};

export default AdminPanel;
