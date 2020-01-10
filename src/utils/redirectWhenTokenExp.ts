const redirectWhenTokenExp = (history, client) => {
  client.writeData({ data: { isLoggedIn: false } });
  alert('로그인 기한 만료로 저장 실패');
  window.scrollTo(0, 0);
  history.push('/');
};

export default redirectWhenTokenExp;
