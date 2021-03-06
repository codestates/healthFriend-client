import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Dropdown, Icon } from 'antd';
import Cookies from 'js-cookie';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import useLazyMe from '../../hooks/Shared/useLazyMe';
import { SET_CHAT_FRIEND } from '../../graphql/queries';

type MypageDropdownProps = {
  name: string;
  history: any;
  location: any;
  match: any;
};

function MypageDropdown({ name, history }: MypageDropdownProps) {
  const client = useApolloClient();
  const { getMe } = useLazyMe();
  const [setChatFriend] = useMutation(SET_CHAT_FRIEND);
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
            client.writeData({ data: { isLoggedIn: false, me: null } });
            // me 를 null로 하면 완전 의도한대로 header의 cache data가 null로 나오는데 false, undefined, 'hello'로 하면 cache엔 그 값으로 남지만, header의 cache에서 긁어오는 data를 찍어보면 undefined로 뜸. 아마 me query의 형식에 맞지 않아서?? null만 가능한 type인건가?? 또 한가지는 undefined면, Home에서 network-only로 날렸을 때도 어디서 가져온건지 모르는 cache에서 값을 가져옴. network에서 가져오는게 아니라... 근데 위처럼 null로 만들어 버리면 null 값을 가져오는데, 위처럼 형식에 안 맞는 undefined이면 자기가 저장해놓은 원래 값을 가져옴. 일단 network-only는 안되는 것이니 확실하게 버그가 있긴 한듯.
            setChatFriend({ variables: { id: '', nickname: '' } });
            Cookies.remove('stream-chat-token', {
              path: '/',
              domain:
                process.env.NODE_ENV === 'development'
                  ? 'localhost'
                  : '.healthfriend.club',
            });
            Cookies.remove('access-token', {
              // localhost에서는 안 적어도 상관없으나 production 환경에선 아래 다 적어줘야 함.
              path: '/',
              domain:
                process.env.NODE_ENV === 'development'
                  ? 'localhost'
                  : '.healthfriend.club',
            });
            history.push('/');
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
          getMe();
        }}
      >
        {name} 친구님&nbsp;
        <Icon type="down" />
      </Link>
    </Dropdown>
  );
}

export default withRouter(MypageDropdown);
