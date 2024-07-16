import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Table, Typography } from 'antd';

import commentsTableCols from './CommentsTableCols';
import { fetchComments, selectComments, selectCommentsError, selectCommentsLoadingStatus } from '../../store/slices/commentsSlice';
import { AppDispatch } from '../../store/store';

import './MainPage.css';


const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector(selectComments);
  const commentsLoadingStatus = useSelector(selectCommentsLoadingStatus);
  const commentsError = useSelector(selectCommentsError);

  const getComments = useCallback(() => dispatch(fetchComments()), [])

  useEffect(() => {
    getComments();
  }, [])

  return (
    <>
      <Typography.Title>Последние комментарии</Typography.Title>
      { commentsError 
        ? <Alert message="Произошла ошибка при загрузке комментариев. Попробуйте перезагрузить страницу" type='error' />
        : <Table
          rowKey="id"
          pagination={ false }
          loading={ commentsLoadingStatus }
          dataSource={ comments?.slice(0, 10) }
          columns={ commentsTableCols }
        />
      }
    </>
  )
};

export default MainPage;
