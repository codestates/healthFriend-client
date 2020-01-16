/** @jsx jsx */
import { notification } from 'antd';
import { useSubscription } from '@apollo/react-hooks';

import { SUBSCRIBE_FOLLOWERS, SUBSCRIBE_FRIENDS } from '../graphql/queries';

const useSubscript = (history) => {
  const { data: subsFollowers } = useSubscription(SUBSCRIBE_FOLLOWERS);
  const { data: subsFriends } = useSubscription(SUBSCRIBE_FRIENDS);

  // subscription쪽 error handling도 해야 함.
  if (subsFollowers) {
    notification.open({
      message: '친구 신청이 도착했어요!',
      description: `${subsFollowers.subscribeRequestFriend.nickname}님이 친구가 되고 싶어합니다. 클릭하여 받은 요청을 확인해보세요`,
      onClick: () => {
        history.push('/cards/followers');
      },
    });
  }
  if (subsFriends) {
    notification.open({
      message: '헬스 친구가 생겼어요!',
      description: `${subsFriends.subscribeAddFriend.nickname}님이 친구 신청을 수락했어요. 클릭하여 헬스 친구를 확인하고, 대화해보세요`,
      onClick: () => {
        history.push('/cards/friends');
      },
    });
  }
  return { subsFriends, subsFollowers };
};

export default useSubscript;
