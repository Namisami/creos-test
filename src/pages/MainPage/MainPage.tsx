import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Typography } from 'antd';

import commentsTableCols from './CommentsTableCols';
import { fetchComments, selectComments, selectCommentsLoadingStatus } from '../../store/slices/commentsSlice';
import { AppDispatch } from '../../store/store';

import './MainPage.css';


const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>()

  const comments = useSelector(selectComments)
  const commentsLoadingStatus = useSelector(selectCommentsLoadingStatus)

  const getComments = useCallback(() => dispatch(fetchComments()), [])

  useEffect(() => {
    getComments();
  }, [])

  useEffect(() => {
    console.log(comments)
  }, [comments])

  // const loadi

  return (
    <>
      <Table
        rowKey="id"
        pagination={ false }
        title={ () => <Typography.Title>Последние комментарии</Typography.Title> }
        loading={ commentsLoadingStatus }
        dataSource={ comments.slice(0, 10) }
        columns={ commentsTableCols }
      />
    </>
  )
};

export default MainPage;
