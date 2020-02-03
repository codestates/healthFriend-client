import Cookies from 'js-cookie';

const redirectWhenError = ({ history, client }) => {
  client.writeData({ data: { isLoggedIn: false } });
  if (Cookies.get('access-token')) {
    alert('에러로 요청 실패');
  } else {
    alert('로그인 기한 만료로 저장 실패');
  }
  window.scrollTo(0, 0);
  history.push('/');
};

export default redirectWhenError;
