/** @jsx jsx */
import { Modal, Button } from 'antd';
import { jsx, css } from '@emotion/core';

const tableCSS = css`
  width: 100%;
`;

const tableTH = css`
  width: 100px;
`;

type UserModalProps = {
  changeToKorean: Function;
  makeOrder: Function;
  visible: boolean;
  setVisible: (args: boolean) => void;
  loading: boolean;
  setLoading: (args: boolean) => void;
  nickname: string;
  gender: string;
  levelOf3Dae: string;
  weekdays: any[];
  ableDistricts: any[];
  motivations: any[];
  openImageChoice: string;
  messageToFriend: string;
  type: string;
};

function UserModal({
  changeToKorean,
  makeOrder,
  visible,
  setVisible,
  loading,
  setLoading,
  nickname,
  gender,
  levelOf3Dae,
  weekdays,
  ableDistricts,
  motivations,
  openImageChoice,
  messageToFriend,
  type,
}: UserModalProps) {
  const handleOk = () => {
    setLoading(true);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const RightButton = (): any => {
    if (type === 'unknown') {
      return (
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          친구신청
        </Button>
      );
    }
    if (type === 'friends') {
      return (
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          채팅하기
        </Button>
      );
    }
    if (type === 'following') {
      return (
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          친구신청 취소
        </Button>
      );
    }
    if (type === 'followers') {
      return (
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          친구수락
        </Button>
      );
    }
  };

  return (
    <div>
      <Modal
        visible={visible}
        title={nickname}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            닫기
          </Button>,
          <RightButton key="right" />,
        ]}
      >
        <table css={tableCSS}>
          <tbody>
            <tr>
              <th css={tableTH}>성별</th>
              <td>{changeToKorean({ gender })}</td>
            </tr>
            <tr>
              <th css={tableTH}>3대 중량</th>
              <td>{changeToKorean({ levelOf3Dae })}</td>
            </tr>
            <tr>
              <th css={tableTH}>사진 공개</th>
              <td>{changeToKorean({ openImageChoice })}</td>
            </tr>
            <tr>
              <th css={tableTH}>운동 가능 지역</th>
              <td>
                {ableDistricts.map((elm) => elm.district.nameOfDong).join(', ')}
              </td>
            </tr>
            <tr>
              <th css={tableTH}>운동 가능 요일</th>
              <td>
                {weekdays
                  .map((elm) => changeToKorean({ weekdays: elm.weekday }))
                  .sort(makeOrder({ weekdays }))
                  .join(', ')}
              </td>
            </tr>
            <tr>
              <th css={tableTH}>헬친을 찾는 이유</th>
              <td>
                {motivations
                  .map((elm) => changeToKorean({ motivations: elm.motivation }))
                  .join(', ')}
              </td>
            </tr>
            <tr>
              <th css={tableTH}>인사말</th>
              <td>{messageToFriend}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
}

export default UserModal;
