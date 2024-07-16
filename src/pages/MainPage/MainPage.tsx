import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Table, Typography } from 'antd';

import commentsTableCols from './CommentsTableCols';
import { fetchComments, selectComments, selectCommentsError, selectCommentsLoadingStatus } from '../../store/slices/commentsSlice';
import { fetchDesigners, selectDesigners, selectDesignersError, selectDesignersLoadingStatus } from '../../store/slices/designersSlice';
import { AppDispatch } from '../../store/store';

import './MainPage.css';
import designersTableCols from './DesignersTableCols';


const MainPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const comments = useSelector(selectComments);
  const commentsLoadingStatus = useSelector(selectCommentsLoadingStatus);
  const commentsError = useSelector(selectCommentsError);
  const designers = useSelector(selectDesigners);
  const designersLoadingStatus = useSelector(selectDesignersLoadingStatus);
  const designersError = useSelector(selectDesignersError);

  const getComments = useCallback(() => dispatch(fetchComments()), [])
  const getDesigners = useCallback(() => dispatch(fetchDesigners()), [])

  useEffect(() => {
    getComments();
    getDesigners();
  }, [])

  return (
    <>
      <section className='main__section main__comments'>
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
      </section>
      <section className="main__section main__designers">
        <Typography.Title>Топ дизайнеров</Typography.Title>
        { designersError 
          ? <Alert message="Произошла ошибка при загрузке топа дизайнеров. Попробуйте перезагрузить страницу" type='error' />
          : <Table
            rowKey="email"
            pagination={ false }
            loading={ designersLoadingStatus }
            dataSource={ designers?.slice(0, 10) }
            columns={ designersTableCols }
          />
        }
      </section>
    </>
  )
};

export default MainPage;
