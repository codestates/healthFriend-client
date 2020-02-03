import React from 'react';
import Loading from '../Shared/Loading';
import redirectWhenError from '../../utils/redirectWhenError';
import message from '../../config/Message';
import MadeCard from '../Shared/UserCard/MadeCard';
import sortByDate from '../../utils/sortByDate';
import EmptyComponent from './EmptyComponent';

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
    const {
      followingEmpty1,
      followingEmpty2,
      followersEmpty1,
      followersEmpty2,
      friendsEmpty1,
      friendsEmpty2,
    } = message;

    if (state === 'following') {
      if (following.length > 0) {
        return following
          .sort(sortByDate)
          .map((oneData) =>
            makeCard(oneData.following, () => null, true, false),
          );
      }
      return <EmptyComponent text1={followingEmpty1} text2={followingEmpty2} />;
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
      return <EmptyComponent text1={followersEmpty1} text2={followersEmpty2} />;
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
      return <EmptyComponent text1={friendsEmpty1} text2={friendsEmpty2} />;
    }
  }
}
