import { Avatar, TableProps } from 'antd';

import { Designer } from '../../types/Designer';
import { Issue } from '../../types/Issue';


const fullDesignersTableCols: TableProps<Designer>['columns'] = [
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
  {
    title: 'Почта',
    dataIndex: ['email'],
    key: 'email',
  },
  {
    title: 'Выполнено задач',
    dataIndex: 'issues',
    key: 'issues_completed',
    render: (issues: Issue[]) => {
      const doneIssues =  issues?.filter((issue) => issue.status === "Done")
      return doneIssues.length ? doneIssues.length : 0
    }
  },
  {
    title: 'Задач в процессе',
    dataIndex: 'issues',
    key: 'issues_in_progress',
    render: (issues: Issue[]) => {
      const doneIssues =  issues?.filter((issue) => issue.status === "In Progress")
      return doneIssues.length ? doneIssues.length : 0
    }
  },
]

export default fullDesignersTableCols;
