import React from 'react';

import Loading from '../Shared/Loading';
import redirectWhenError from '../../utils/redirectWhenError';
import message from '../../config/Message';
import MadeCard from '../Shared/MadeCard';
import sortByDate from '../../utils/sortByDate';

type FriendListProps = {
  loadingFR: boolean | undefined;
  errorFR: any;
  dataFR: any;
  history: any;
  client: any;
  state: string;
  setChatFriend: Function;
};

export default function FriendList({
  loadingFR,
  errorFR,
  dataFR,
  history,
  client,
  state,
  setChatFriend,
}: FriendListProps) {
  if (loadingFR) return <Loading />;
  if (errorFR) redirectWhenError({ history, client });
  if (dataFR && dataFR.me) {
    const makeCard = (oneData, func, checked) =>
      MadeCard(oneData, state, func, checked);
    const { following, followers, friends } = dataFR.me;

    if (state === 'following') {
      if (following.length > 0) {
        return following
          .sort(sortByDate)
          .map((oneData) => makeCard(oneData.following, () => null, true));
      }
      return <div>{message.followingEmpty}</div>;
    }
    if (state === 'followers') {
      if (followers.length > 0) {
        return followers
          .sort(sortByDate)
          .sort((a, b) => b.checked - a.checked)
          .map((oneData) =>
            makeCard(oneData.follower, () => null, oneData.checked),
          );
      }
      return <div>{message.followersEmpty}</div>;
    }
    if (state === 'friends') {
      if (friends.length > 0) {
        return friends
          .sort(sortByDate)
          .sort((a, b) => b.checked - a.checked)
          .map((el) => el.friend)
          .map((oneData) => makeCard(oneData, setChatFriend, oneData.checked));
      }
      return <p>{message.friendsEmpty}</p>;
    }
  }
}
