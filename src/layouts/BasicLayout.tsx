import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
};

export default BasicLayout;
