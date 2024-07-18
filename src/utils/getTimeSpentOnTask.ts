import { DesignerIssue } from "../types/Designer";
import { Issue } from "../types/Issue";


const getTimeSpentOnTask = ({
  date_started_by_designer, 
  date_finished_by_designer
}: Issue | DesignerIssue) => {
  const startDate = new Date(date_started_by_designer);
  const finishDate = date_finished_by_designer ? 
    new Date(date_finished_by_designer) : new Date();
  
  return Math.floor((finishDate.getTime() - startDate.getTime()) / 1000 / 60 / 60);
};

export default getTimeSpentOnTask;
