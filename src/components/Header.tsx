import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <NavLink exact to="/" className="item" activeClassName="active">
        헬친
      </NavLink>
      <NavLink to="/register" className="item">
        등록
      </NavLink>
      <NavLink to="/find" className="item">
        친구찾기
      </NavLink>
      <NavLink to="/chat" className="item">
        채팅
      </NavLink>
      <NavLink to="/mypage" className="item">
        마이페이지
      </NavLink>
      <NavLink to="/login" className="item">
        로그인
      </NavLink>
    </div>
  );
}
