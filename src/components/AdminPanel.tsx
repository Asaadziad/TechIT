import { FunctionComponent, useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/context/UserContext";
import User from "../interfaces/User";
import { getUserById } from "../services/userServices";
import CRM from "./CRM/CRM";

interface AdminPanelProps {}

const AdminPanel: FunctionComponent<AdminPanelProps> = () => {
  let userContext = useContext(UserContext);
  let [user, setUser] = useState<User>();
  useEffect(() => {
    let userId = JSON.parse(
      sessionStorage.getItem("userData") as string
    )?.userId;
    getUserById(userId)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {userContext.isAdmin ? (
        <>
          <div className="container bg-light h-100 py-5">
            <h2 className="pt-5">Welcome back, {user?.name}</h2>
            <div className="container mt-5">
              <h6>TechIT Customers:</h6>
              <CRM />
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
