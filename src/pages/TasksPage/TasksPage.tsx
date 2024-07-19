import { useCallback, useEffect, useMemo } from 'react';
import { AxisOptions, Chart } from 'react-charts';
import './TasksPage.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchIssues, selectDoneIssues, selectIssuesError, selectIssuesLoadingStatus } from '../../store/slices/issuesSlice';
import { Alert, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type TasksDone = {
  week: number,
  value: number,
  // outcome: number,
  // profit: number,
}

type Series = {
  label: string,
  data: TasksDone[]
}

const data: Series[] = [
  {
    label: 'Ушло',
    data: [
      {
        week: 1,
        value: 30,
      },
    ]
  },
  {
    label: 'Пришло',
    data: [
      {
        week: 1,
        value: 10,
      },
    ]
  },
  {
    label: 'Прибыль',
    data: [
      {
        week: 1,
        value: 20,
      },
    ]
  },
  {
    label: 'Ушло',
    data: [
      {
        week: 2,
        value: 70,
      }
      // ...
    ]
  },
  {
    label: 'Пришло',
    data: [
      {
        week: 2,
        value: 40,
      }
      // ...
    ]
  },
  {
    label: 'Прибыль',
    data: [
      {
        week: 2,
        value: 30,
      }
      // ...
    ]
  },
  {
    label: 'Ушло',
    data: [
      {
        week: 3,
        value: 70,
      }
      // ...
    ]
  },
  {
    label: 'Пришло',
    data: [
      {
        week: 3,
        value: 40,
      }
      // ...
    ]
  },
  {
    label: 'Прибыль',
    data: [
      {
        week: 3,
        value: 30,
      }
      // ...
    ]
  }
]


const TasksPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const issues = useSelector(selectDoneIssues);
  const issuesLoadingStatus = useSelector(selectIssuesLoadingStatus);
  const issuesError = useSelector(selectIssuesError);

  const getIssues = useCallback(() => dispatch(fetchIssues()), [])
  
  useEffect(() => {
    getIssues();
  }, [])
  useEffect(() => {
    console.log(issues);
  }, [issues])

  const primaryAxis = useMemo(
    (): AxisOptions<TasksDone> => ({
      getValue: datum => datum.week,
    }),
    []
  )

  const secondaryAxes = useMemo(
    (): AxisOptions<TasksDone>[] => [
      {
        getValue: datum => datum.value,
        elementType: "bar"
      },
    ],
    []
  )

  return (
    <div className='tasks'>
      <Typography.Title>Последние задачи</Typography.Title>
        { issuesLoadingStatus
          ? <div className="tasks__loading">
              <LoadingOutlined />
            </div>
          : issuesError 
            ? <Alert message="Произошла ошибка при загрузке задач. Попробуйте перезагрузить страницу" type='error' />
            : <div className="tasks__chart">
                <Chart
                  options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                  }}
                />
              </div>
        }
    </div>
  )
};

export default TasksPage;
