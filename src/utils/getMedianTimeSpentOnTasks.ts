import { Issue } from "../types/Issue"
import getTimeSpentOnTask from "./getTimeSpentOnTask"
import getMedian from "./getMedian"
import { DesignerIssue } from "../types/Designer"


const getMedianTimeSpentOnTasks = (tasks: Issue[] | DesignerIssue[] | undefined) => {
  if (!tasks) return 0
  const hours: number[] = []
  tasks.forEach((task) => hours.push(getTimeSpentOnTask(task)))
  return getMedian(hours)
}

export default getMedianTimeSpentOnTasks
