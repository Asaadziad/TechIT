import { FunctionComponent, useContext } from "react";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import "./adminstats.css";

interface AdminStatsProps {
  customers: number;
}

const AdminStats: FunctionComponent<AdminStatsProps> = ({ customers }) => {
  let themeContext = useContext(ThemeContext);
  return (
    <>
      <div
        className={`container bg-${themeContext.isLight ? "light" : "dark"}`}
      >
        <div className="container mt-5 py-1 d-flex justify-content-center">
          <div className="col-md-10 ">
            <div className="row ">
              <div className="col-xl-4 col-lg-6">
                <div className="card l-bg-cherry">
                  <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-shopping-cart"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">Orders</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0">
                          3,243
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6">
                <div className="card l-bg-blue-dark">
                  <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">Customers</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0">
                          {customers}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-lg-6">
                <div className="card l-bg-orange-dark">
                  <div className="card-statistic-3 p-4">
                    <div className="card-icon card-icon-large">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="mb-4">
                      <h5 className="card-title mb-0">Revenue Today</h5>
                    </div>
                    <div className="row align-items-center mb-2 d-flex">
                      <div className="col-8">
                        <h2 className="d-flex align-items-center mb-0">
                          $11.61k
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminStats;
