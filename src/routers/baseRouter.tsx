import { createBrowserRouter } from "react-router-dom";

import BasicLayout from "../layouts/BasicLayout";
import MainPage from "../pages/MainPage/MainPage";
import TasksPage from "../pages/TasksPage/TasksPage";
import DesignerPage from "../pages/DesignerPage/DesignerPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "",
        element: <MainPage />
      },
      {
        path: "tasks",
        element: <TasksPage />
      },
      {
        path: "designer",
        element: <DesignerPage />
      },
    ]
  }
])

export default router;
