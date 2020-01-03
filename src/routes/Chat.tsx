import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS } from '../graphql/queries';
import Loading from '../components/Shared/Loading';
import ErrorLoginFirst from '../components/Shared/ErrorLoginFirst';

function Chat() {
  const { loading, error, data } = useQuery(GET_USERS, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <Loading />;
  if (error)
    // 여기도 서버에서 나오는 에러 종류에 따라서 Login 먼저 하세요를 보여줄지, 혹은 다른 에러 메세지를 보여줄지
    return <ErrorLoginFirst error={error} />;

  console.log(data);

  return <div>채팅창 목록</div>;
}

export default Chat;
