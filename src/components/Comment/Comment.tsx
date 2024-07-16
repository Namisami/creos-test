import { Avatar } from 'antd'
import { Comment as IComment } from '../../types/Comments'
import formatDateFromString from '../../utils/formatDateFromString'
import './Comment.css'


interface CommentProps {
  content: IComment
}

const Comment = ({
  content
}: CommentProps) => {
  return (
    <>
      <Avatar src={ content.designer.avatar }/>
      <span>{ content.designer.username }</span>
      <span>{ formatDateFromString(content.date_created) }</span>
      <span>{ content.issue }</span>
      <span>{ content.message }</span>
    </>
  )
}

export default Comment
