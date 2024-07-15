import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
};

export default BasicLayout;
