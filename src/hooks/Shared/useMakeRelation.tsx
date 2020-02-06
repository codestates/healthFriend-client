import { useMutation } from '@apollo/react-hooks';
import {
  FOLLOW_USER,
  CANCEL_FOLLOWING,
  ADD_FRIEND,
  DELETE_FRIEND,
  DELETE_FOLLOWER,
  GET_USERINFO,
  GET_FRIENDS,
} from '../../graphql/queries';

const useMakeRelation = ({ afterDoneFunc, errorHandle }) => {
  const [followUser, { loading: loadingFU }] = useMutation(FOLLOW_USER, {
    refetchQueries: [{ query: GET_USERINFO }],
    onCompleted: (data) => afterDoneFunc(data, null, true, false),
    onError: (error) => errorHandle(error),
  });
  const [cancelFollow, { loading: loadingCF }] = useMutation(CANCEL_FOLLOWING, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => afterDoneFunc(data, null, true, false),
    onError: (error) => errorHandle(error),
  });
  const [addFriend, { loading: loadingAF }] = useMutation(ADD_FRIEND, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => afterDoneFunc(data, 'addFriend', true, true),
    onError: (error) => errorHandle(error),
  });
  const [deleteFriend, { loading: loadingDF }] = useMutation(DELETE_FRIEND, {
    refetchQueries: [{ query: GET_FRIENDS }],
    onCompleted: (data) => afterDoneFunc(data, 'deleteFriend', true, true),
    onError: (error) => errorHandle(error),
  });
  const [deleteFollower, { loading: loadingDFo }] = useMutation(
    DELETE_FOLLOWER,
    {
      refetchQueries: [{ query: GET_FRIENDS }],
      onCompleted: (data) => afterDoneFunc(data, 'deleteFollower', true, true),
      onError: (error) => errorHandle(error),
    },
  );

  return {
    deleteFriend,
    deleteFollower,
    addFriend,
    followUser,
    cancelFollow,
    loadingFU,
    loadingDFo,
    loadingDF,
    loadingAF,
    loadingCF,
  };
};

export default useMakeRelation;
