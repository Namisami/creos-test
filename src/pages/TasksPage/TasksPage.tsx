import { useCallback, useEffect, useState } from 'react';
import { Alert, InputNumber, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BarChart } from '@mui/x-charts';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchIssues, selectIOPForNWeeks, selectIssuesError, selectIssuesLoadingStatus } from '../../store/slices/issuesSlice';

import './TasksPage.css';
import { DatasetElementType } from '@mui/x-charts/internals';


const TasksPage = () => {
  const [showWeeks, setShowWeeks] = useState<number | null>(8);

  const dispatch = useDispatch<AppDispatch>();
  
  const dataset = useSelector((state: RootState) => selectIOPForNWeeks(state, showWeeks ? showWeeks : 0));
  const issuesLoadingStatus = useSelector(selectIssuesLoadingStatus);
  const issuesError = useSelector(selectIssuesError);
  
  const getIssues = useCallback(() => dispatch(fetchIssues()), [])

  const onShowWeeksChange = (value: number | null) => {
    setShowWeeks(value);
  }
  
  useEffect(() => {
    getIssues();
  }, [])

  return (
    <div className='tasks'>
      <div className="tasks__header">
        <Typography.Title>Последние задачи</Typography.Title>
        <div className="tasks__weeks">
          <Typography.Text>Показывать последние</Typography.Text>
          <InputNumber min={ 1 } value={ showWeeks } onChange={ onShowWeeksChange } />
          <Typography.Text>недель</Typography.Text>
        </div>
      </div>
        { issuesLoadingStatus
          ? <div className="tasks__loading">
              <LoadingOutlined />
            </div>
          : issuesError 
            ? <Alert message="Произошла ошибка при загрузке задач. Попробуйте перезагрузить страницу" type='error' />
            : <div className="tasks__chart">
                <BarChart
                  dataset={ dataset as unknown as DatasetElementType<string | number | Date | null | undefined>[] }
                  xAxis={[{ scaleType: 'band', dataKey: "week" }]}
                  series={[
                    { dataKey: 'income', label: "Приход"},
                    { dataKey: 'outcome', label: "Уход"},
                    { dataKey: 'profit', label: "Прибыль"},
                  ]}
                  // width={500}
                  // height={300}
                />
              </div>
        }
    </div>
  )
};

export default TasksPage;
