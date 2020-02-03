/** @jsx jsx */
import { useState } from 'react';
import { Col, Card, Avatar, Popover } from 'antd';
import { jsx, css } from '@emotion/core';
import { useApolloClient } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import UserModal from './UserModal';
import Loading from '../Loading';
import barbell from '../../../static/barbell.png';
import DayTable from './DayTable';
import modifyData from '../../../utils/Shared/UserCard/modifyData';
import makeCardFooterBtn from '../../../utils/Shared/UserCard/makeCardFooterBtn';
import handleCardModalBtn from '../../../utils/Shared/UserCard/handleCardModalBtn';
import useMakeRelation from '../../../hooks/Shared/useMakeRelation';
import useCheckUnread from '../../../hooks/Shared/useCheckUnread';

const margin = css`
  padding: 10px;
  margin: 0 auto;
  text-align: center;
`;
const cardCSS = css`
  border-radius: 4px;
  width: 100%;
  display: inline-block;
  border: none;
  border-radius: none;

  .ant-card-head-title {
    padding: 0;
  }
  .ant-card-body {
    height: 200px;
    overflow: auto;
    padding: 0px;
    background-color: #ededed;
  }
  .ant-card-actions {
    border-radius: 0 0 4px 4px;
    background-color: #e9e2d0;
  }
  .ant-card-meta {
    padding: 10px;
  }
  .ant-card-meta-avatar {
    padding: 2px;
  }
  .ant-card-meta-title {
    font-size: 24px;
    width: 100%;
    padding-left: 10px;
    color: white;
  }
`;
const iconWrapper = css`
  text-align: center;
  margin-top: 5px;
`;
const districtCSS = css`
  border: 1px solid #ededed;
  border-radius: 4px;
  background: #fafafa;
  padding: 5px;
  margin-right: 5px;
  line-height: 2.5;
  white-space: nowrap;
`;
const profileImageCss = css`
  width: 100px;
  height: 100px;
`;
const placesCss = css`
  margin-top: 10px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
`;

const cardWrapper = css`
  text-align: left;
`;

type UserCardProps = {
  id: any; // string으로 하면 안 되는 이유는??
  nickname: string;
  gender: string;
  levelOf3Dae: string;
  weekdays: any[];
  ableDistricts: any[];
  motivations: any[];
  openImageChoice: string;
  messageToFriend: string;
  profileImage: string | undefined;
  type: string;
  history: any;
  location: any;
  match: any;
  checked: boolean;
  setChatFriend: Function;
  isFriend: boolean;
};

function UserCard({
  id,
  nickname,
  gender,
  levelOf3Dae,
  weekdays,
  ableDistricts,
  motivations,
  openImageChoice,
  messageToFriend,
  profileImage,
  type,
  history,
  checked,
  setChatFriend,
  isFriend,
}: UserCardProps) {
  const client = useApolloClient();
  const [visible, setVisible] = useState<boolean>(false);
  const { errorHandle, afterDoneFunc } = handleCardModalBtn({
    history,
    client,
  });

  const {
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
  } = useMakeRelation({ afterDoneFunc, errorHandle });
  const { checkFollowers, checkFriends } = useCheckUnread({
    afterDoneFunc,
    errorHandle,
  });

  // 나중에 loading 같은 것 붙이기. 그리고 완료시 완료됐다는 문구. z-index같은 것 줘서 투명도 조절해서 친구 목록들 위에 띄워주면 좋을듯.

  const cardActions = makeCardFooterBtn({
    type,
    checkFriends,
    checkFollowers,
    id,
    nickname,
    setVisible,
    setChatFriend,
    deleteFriend,
    deleteFollower,
    addFriend,
    followUser,
    cancelFollow,
    history,
  });

  const { healthLevel, genderColor, changeToKorean, makeOrder } = modifyData({
    levelOf3Dae,
    gender,
  });

  return (
    <Col xs={24} md={12} lg={6} css={margin}>
      <Card actions={cardActions} css={cardCSS}>
        <UserModal
          {...{
            id,
            changeToKorean,
            makeOrder,
            visible,
            setVisible,
            nickname,
            levelOf3Dae,
            gender,
            weekdays,
            ableDistricts,
            motivations,
            openImageChoice,
            messageToFriend,
            profileImage,
            type,
            history,
            setChatFriend,
            isFriend,
          }}
        />
        <div css={cardWrapper}>
          <div style={{ backgroundColor: checked ? '#5075AF' : '#ED9364' }}>
            <Card.Meta
              avatar={
                profileImage &&
                (openImageChoice === 'OPEN' ||
                  (openImageChoice === 'FRIEND' && isFriend)) ? (
                  <Popover
                    content={
                      <img
                        src={profileImage}
                        css={profileImageCss}
                        height="50px"
                        width="50px"
                        alt=""
                      />
                    }
                    title={nickname}
                  >
                    <Avatar src={profileImage} />
                  </Popover>
                ) : (
                  <Avatar icon="user" />
                )
              }
              title={nickname}
            />
          </div>
          <div>
            {loadingFU || loadingDFo || loadingDF || loadingAF || loadingCF ? (
              <Loading />
            ) : (
              <div>
                <div css={iconWrapper}>
                  <div>
                    <img
                      src={barbell}
                      alt=""
                      width={healthLevel}
                      height="20px"
                    />
                  </div>
                  <FontAwesomeIcon
                    icon={faChild}
                    size="2x"
                    style={{ color: genderColor }}
                  />
                </div>
                <div>
                  <DayTable {...{ changeToKorean, makeOrder, weekdays }} />
                </div>
                <div css={placesCss}>
                  {ableDistricts
                    .map((elm) => (
                      <span css={districtCSS} key={elm.district.nameOfDong}>
                        {elm.district.nameOfDong}
                      </span>
                    ))
                    .filter((_, idx) => idx < 3)}
                  {ableDistricts.length > 3 ? '.......' : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Col>
  );
}

export default withRouter(UserCard);
