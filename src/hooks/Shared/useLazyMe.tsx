import { useLazyQuery } from '@apollo/react-hooks';

import { GET_USERINFO } from '../../graphql/queries';

const useLazyMe = () => {
  // 이 방식은 모든 아폴로 문제가 단지 로그인 문제가 아니라 그저 서버 문제일 수도 있는데 다 로그인만 하면 해결될 것처럼 로그인하라고 보내는데에 문제가 있음. 일단 token expire 문제 잡을 방식이 안 떠올라서 이대로 감.

  const [
    getMe,
    { loading: loadingMe, data: dataMe, error: errorMe },
  ] = useLazyQuery(GET_USERINFO, {
    fetchPolicy: 'network-only',
  });

  return { getMe, loadingMe, dataMe, errorMe };
};

export default useLazyMe;
