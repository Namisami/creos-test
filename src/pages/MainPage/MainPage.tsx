import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, selectComments } from '../../store/slices/commentsSlice';
import { AppDispatch } from '../../store/store';
import './MainPage.css';


const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>()
  const comments = useSelector(selectComments)

  const getComments = useCallback(() => dispatch(fetchComments()), [])

  useEffect(() => {
    getComments();
  }, [])

  useEffect(() => {
    console.log(comments)
  }, [comments])
  return (
    <>
      { comments.map((comment) => {
        return (
          <p>{ comment.issue }</p>
        )
      })}
    </>
  )
};

export default MainPage;
