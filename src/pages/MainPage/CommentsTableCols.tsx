import { Avatar, TableProps } from 'antd';

import { Comment } from '../../types/Comment';
import getTimeHasGone from '../../utils/getTimeHasGone';


const commentsTableCols: TableProps<Comment>['columns'] = [
  {
    title: 'Аватар',
    dataIndex: ['designer', 'avatar'],
    key: 'avatar',
    width: 80,
    render: (avatar) => <Avatar size="large" className='comment__avatar' src={ avatar } />,
  },
  {
    title: 'Пользователь',
    dataIndex: ['designer', 'username'],
    key: 'username',
  },
  {
    title: 'Дата',
    dataIndex: 'date_created',
    key: 'date_created',
    render: (dateString) => getTimeHasGone(dateString),
  },
  {
    title: 'Задача',
    dataIndex: 'issue',
    key: 'issue',
  },
  {
    title: 'Сообщение',
    dataIndex: 'message',
    key: 'message',
    width: 600,
    ellipsis: true,
    render: (message) => <span className='comment__message'>{ message }</span>
  },
]

export default commentsTableCols;
