import { useMutation } from '@apollo/react-hooks';
import {
  GET_FRIENDS,
  CHECK_FOLLOWERS,
  CHECK_FRIENDS,
} from '../../graphql/queries';

const useCheckUnread = ({ afterDoneFunc, errorHandle }) => {
  const [checkFollowers] = useMutation(CHECK_FOLLOWERS, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => afterDoneFunc(data, 'checkFollowers', false, true),
    onError: (error) => errorHandle(error),
  });
  const [checkFriends] = useMutation(CHECK_FRIENDS, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => afterDoneFunc(data, 'checkFriends', false, true),
    onError: (error) => errorHandle(error),
  });

  return { checkFollowers, checkFriends };
};

export default useCheckUnread;
