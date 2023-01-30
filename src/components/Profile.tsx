import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { getUserById } from "../services/userServices";
import "./profile.css";
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
      <div className="container bg-light">
        <div className="container mt-5 py-5">
          <div className="card " style={{ width: "100%", minHeight: "400px" }}>
            <div className="row g-0">
              <div className="col-md-4 pfp-img">
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
                    Welcome to the TECHIT - ReactJs Ecommerce SPA (single page
                    application)
                  </p>
                  <p className="card-text">
                    TechIT features Register/Login system with admin
                    identification where admins can add/update/delete products.
                    in addtion a home page that features some of the top sold
                    products and some of the brand info.
                  </p>
                  <p className="card-text">
                    <small className="text-muted">
                      Designed and developed by @Asaadziad
                    </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
