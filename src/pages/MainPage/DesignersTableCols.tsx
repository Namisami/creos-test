import { Avatar, TableProps } from 'antd';

import { Designer } from '../../types/Designer';


const designersTableCols: TableProps<Designer>['columns'] = [
  {
    title: 'Аватар',
    dataIndex: ['avatar'],
    key: 'avatar',
    width: 80,
    render: (avatar) => <Avatar size="large" className='designer__avatar' src={ avatar } />,
  },
  {
    title: 'Пользователь',
    dataIndex: ['username'],
    key: 'username',
  },
  // {
  //   title: 'Дата',
  //   dataIndex: 'date_created',
  //   key: 'date_created',
  //   render: (dateString) => getTimeHasGone(dateString),
  // },
  // {
  //   title: 'Задача',
  //   dataIndex: 'issue',
  //   key: 'issue',
  // },
  // {
  //   title: 'Сообщение',
  //   dataIndex: 'message',
  //   key: 'message',
  //   width: 600,
  //   ellipsis: true,
  //   render: (message) => <span className='comment__message'>{ message }</span>
  // },
]

export default designersTableCols;
