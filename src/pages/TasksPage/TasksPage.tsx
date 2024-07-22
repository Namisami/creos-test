import { useCallback, useEffect, useState } from 'react';
import { Alert, InputNumber, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { BarChart, PieChart } from '@mui/x-charts';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchIssues, selectIOPForNWeeks, selectIssuesDistribution, selectIssuesError, selectIssuesLoadingStatus } from '../../store/slices/issuesSlice';

import './TasksPage.css';
import { DatasetElementType } from '@mui/x-charts/internals';


const TasksPage = () => {
  const [showWeeks, setShowWeeks] = useState<number | null>(8);

  const dispatch = useDispatch<AppDispatch>();
  
  const dataset = useSelector((state: RootState) => selectIOPForNWeeks(state, showWeeks ? showWeeks : 0));
  const issuesDistributionDataset = useSelector(selectIssuesDistribution);
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
            : <>
                <div className="tasks__chart">
                  <BarChart
                    dataset={ dataset as unknown as DatasetElementType<string | number | Date | null | undefined>[] }
                    xAxis={[{ scaleType: 'band', dataKey: "week" }]}
                    series={[
                      { dataKey: 'income', label: "Приход"},
                      { dataKey: 'outcome', label: "Уход"},
                      { dataKey: 'profit', label: "Прибыль"},
                    ]}
                    height={ 500 }
                  />
                </div>
                <Typography.Title>Статусы всех задач</Typography.Title>
                <div className="tasks__chart">
                  <PieChart
                    slotProps={{
                      legend: {
                        direction: "row",
                        position: {
                          vertical: "top",
                          horizontal: "middle"
                        }
                      }
                    }}
                    margin={{
                      top: 50,
                      left: 80
                    }}
                    series={[
                      {
                        data: issuesDistributionDataset,
                      },
                    ]}
                    height={ 400 }
                  />
                </div>
              </>
        }
    </div>
  )
};

export default TasksPage;
