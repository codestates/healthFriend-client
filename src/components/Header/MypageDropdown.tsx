import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
import cookie from 'js-cookie';

// import { useQuery } from '@apollo/react-hooks';

// import { GET_USERINFO } from '../../graphql/queries';
import useCheckToken from '../../hooks/useCheckToken';

type MypageDropdownProps = {
  name: string;
  history: any;
  location: any;
  match: any;
};

function MypageDropdown({ name, history }: MypageDropdownProps) {
  // const { data, refetch } = useQuery(GET_USERINFO, {
  //   fetchPolicy: 'network-only',
  // });
  const { client, getInfo /* loadingUser, dataUser */ } = useCheckToken();

  const menu = (
    <Menu>
      <Menu.Item>안녕하세요 친구님</Menu.Item>
      <Menu.Item>
        <Link to="/mypage">정보 변경</Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/"
          onClick={() => {
            client.writeData({ data: { isLoggedIn: false } });
            cookie.remove('access-token', {
              // 공식문서에는 path 를 필수적으로 적으란 식으로 되어있는데 서버에서 심어서 그런지 적으면 안 됨.
              // path: '/login',
              // domain:
              //   process.env.NODE_ENV === 'development'
              //     ? 'http://localhost:4000/'
              //     : 'https://api.healthfriend.club/',
            });
            history.push('/');

            /* // window.location.reload();
            // 여기도 reload 보다는 subscription으로 바꾸는게 좋을듯. */
          }}
        >
          로그아웃
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <Link
        to="#"
        onMouseEnter={() => {
          getInfo();
          // !loadingUser && dataUser && data ? refetch() : null
        }}
      >
        {name}친구님 <Icon type="down" />
      </Link>
    </Dropdown>
  );
}

export default withRouter(MypageDropdown);
