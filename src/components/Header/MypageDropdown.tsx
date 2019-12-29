// eslint-disable-next-line
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
import cookie from 'js-cookie';

type MypageDropdownProps = {
  name: string;
  history: any;
  location: any;
  match: any;
};

function MypageDropdown({ name, history }: MypageDropdownProps) {
  const menu = (
    <Menu>
      <Menu.Item>안녕하세요 친구님</Menu.Item>
      <Menu.Item>
        <Link to="/mypage">정보 변경</Link>
      </Menu.Item>
      <Menu.Item>
        {/* cookie.remove('access-token'); 
      history.push('/');
      window.location.reload(); */}
        <Link
          to="/"
          onClick={() => {
            history.push('/');
            cookie.remove('access-token');
            window.location.reload();
          }}
        >
          로그아웃
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Link to="#">
        {name}친구님 <Icon type="down" />
      </Link>
    </Dropdown>
  );
}

export default withRouter(MypageDropdown);
