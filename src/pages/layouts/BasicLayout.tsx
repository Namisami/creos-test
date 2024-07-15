import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

const BasicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
};

export default BasicLayout;
