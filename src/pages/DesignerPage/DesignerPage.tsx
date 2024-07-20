import { useCallback, useEffect } from 'react';
import { Alert, Table, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { fetchDesigners, selectDesigners, selectDesignersError, selectDesignersLoadingStatus } from '../../store/slices/designersSlice';
import fullDesignersTableCols from './FullDesignersTableCols';
import './DesignerPage.css';


const DesignerPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const designers = useSelector(selectDesigners);
  const designersLoadingStatus = useSelector(selectDesignersLoadingStatus);
  const designersError = useSelector(selectDesignersError);

  const getDesigners = useCallback(() => dispatch(fetchDesigners()), [])

  useEffect(() => {
    getDesigners(); 
  }, [])

  return (
    <>
      <Typography.Title>Дизайнеры</Typography.Title>
        { designersError 
          ? <Alert message="Произошла ошибка при загрузке дизайнеров. Попробуйте перезагрузить страницу" type='error' />
          : <Table
              rowKey="email"
              loading={ designersLoadingStatus }
              dataSource={ designers }
              columns={ fullDesignersTableCols }
            />
        }
    </>
  )
};

export default DesignerPage;
