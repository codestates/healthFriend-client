/** @jsx jsx */
// import React from 'react';
import { css, jsx } from '@emotion/core';

import Loading from '../Shared/Loading';
import redirectWhenError from '../../utils/redirectWhenError';
import message from '../../config/Message';
import MadeCard from '../Shared/MadeCard';
import sortByDate from '../../utils/sortByDate';
import emptyImage from '../../static/chat-main.jpg';

const wrapperDivCss = css`
  background-color: #e9e2d0;
  height: 60vh;
  margin-bottom: 0;
  padding: 20px;
  border-radius: 10px;
`;

const emptyMessageCss = css`
  position: absolute;
  top: 20%;
  left: 35%;
  font-size: 1rem;
  line-height: 2rem;
`;

const emptyImgCss = css`
  filter: grayscale(100%);
  border-radius: 50%;
  height: 20%;
  width: 20%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

type CardListProps = {
  loadingFR: boolean | undefined;
  errorFR: any;
  dataFR: any;
  history: any;
  client: any;
  state: string;
  setChatFriend: Function;
};

export default function CardList({
  loadingFR,
  errorFR,
  dataFR,
  history,
  client,
  state,
  setChatFriend,
}: CardListProps) {
  if (loadingFR) return <Loading />;
  if (errorFR) redirectWhenError({ history, client });
  if (dataFR && dataFR.me) {
    const makeCard = (oneData, func, checked, isFriend) =>
      MadeCard(oneData, state, func, checked, isFriend);
    const { following, followers, friends } = dataFR.me;

    if (state === 'following') {
      if (following.length > 0) {
        return following
          .sort(sortByDate)
          .map((oneData) =>
            makeCard(oneData.following, () => null, true, false),
          );
      }
      return (
        <div css={wrapperDivCss}>
          <img src={emptyImage} css={emptyImgCss} alt="" />
          <div css={emptyMessageCss}>
            <div>{message.followingEmpty1}</div>
            <div>{message.followingEmpty2}</div>
          </div>
        </div>
      );
    }
    if (state === 'followers') {
      if (followers.length > 0) {
        return followers
          .sort(sortByDate)
          .sort((a, b) => a.checked - b.checked)
          .map((oneData) =>
            makeCard(oneData.follower, () => null, oneData.checked, false),
          );
      }
      return (
        <div css={wrapperDivCss}>
          <img src={emptyImage} css={emptyImgCss} alt="" />
          <div css={emptyMessageCss}>
            <div>{message.followersEmpty1}</div>
            <div>{message.followersEmpty2}</div>
          </div>
        </div>
      );
    }
    if (state === 'friends') {
      if (friends.length > 0) {
        return friends
          .sort(sortByDate)
          .sort((a, b) => a.checked - b.checked)
          .map((oneData) =>
            makeCard(oneData.friend, setChatFriend, oneData.checked, true),
          );
      }
      return (
        <div css={wrapperDivCss}>
          <img src={emptyImage} css={emptyImgCss} alt="" />
          <div css={emptyMessageCss}>
            <div>{message.friendsEmpty1}</div>
            <div>{message.friendsEmpty2}</div>
          </div>
        </div>
      );
    }
  }
}
