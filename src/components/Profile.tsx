import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { getUserById } from "../services/userServices";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
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
      <div className="container mt-5">
        <div
          className="card mb-3"
          style={{ width: "100%", minHeight: "400px" }}
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src="/images/avatar.jpg"
                className="img-fluid rounded-start pfp"
                style={{ height: "100%" }}
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">Welcome back, {user?.name}</h5>
                <p className="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="card-text">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
