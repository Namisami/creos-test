import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from 'antd';

import Comment from '../../components/Comment/Comment';
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
      <List
        header="Последние комментарии"
        loading={ commentsLoadingStatus }
        dataSource={ comments }
        renderItem={ (comment) => (
          <List.Item>
            <Comment content={ comment } />
          </List.Item>
        )}
      >

      </List>
      {/* <Card loading={ commentsLoadingStatus } title="Последние комментарии">
        { comments.map((comment) => {
          return (
            <p>{ comment.issue }</p>
          )
        })}
      </Card> */}
      {/* <Card title="Топ дизайнеров">
      </Card> */}
    </>
  )
};

export default MainPage;
