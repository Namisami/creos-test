import { Avatar, TableProps } from 'antd';

import { Designer } from '../../types/Designer';
import { Issue } from '../../types/Issue';
import getMedianTimeSpentOnTasks from '../../utils/getMedianTimeSpentOnTasks';


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
  {
    title: 'Медианное время',
    dataIndex: 'issues',
    key: 'issues_time_spent',
    render: (issues: Issue[]) => `${getMedianTimeSpentOnTasks(issues)} ч.`,
  },
  {
    title: 'Выполнено задач',
    dataIndex: 'issues',
    key: 'issues_completed',
    render: (issues: Issue[]) => issues?.length ? issues.length : 0
  },
]

export default designersTableCols;
