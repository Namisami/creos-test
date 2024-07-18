import { IssueStatus } from "./Issue"
import { Thumbnail } from "./Thumbnail"


export interface DesignerIssue  {
  id: number
  key: string
  date_created: string
  date_started_by_designer: string
  date_finished_by_designer: string
  status: IssueStatus
}

export interface Designer {
  avatar: string
  username: string
  thumbnails: Thumbnail
  email: string
  issues: DesignerIssue[]
}
