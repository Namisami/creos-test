export type IssueStatus = "New" | "In Progress" | "Done"

export interface Issue {
  id: number
  status: IssueStatus
  designer: string
  project: string
  date_created: string
  summary: string
  received_from_client: number
  send_to_project_manager: number
  send_to_account_manager: number
  send_to_designer: number
  date_updated: string
  date_started_by_designer: string
  date_finished_by_designer: string | null
  date_finished: string
}