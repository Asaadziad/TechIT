import { FunctionComponent } from "react";
import User from "../../../interfaces/User";

interface CRMProps {
  customers: User[];
}

const CRM: FunctionComponent<CRMProps> = ({ customers }) => {
  return (
    <>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Purchases</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {customers.length ? (
            customers.map((item: User) => {
              return (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>0</td>
                  <td>
                    <i className="fa-solid fa-pen"></i>
                  </td>
                  <td>
                    <i className="fa-solid fa-trash-can"></i>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>there's no customers</p>
          )}
        </tbody>
      </table>
    </>
  );
};

export default CRM;
