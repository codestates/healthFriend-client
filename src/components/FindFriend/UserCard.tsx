/** @jsx jsx */
import { Col, Card } from 'antd';
import { jsx, css } from '@emotion/core';

const margin = css`
  margin-bottom: 20px;
`;

type UserCardProps = {
  nickname: string;
  levelOf3Dae: string;
  weekdays: any[];
  ableDistricts: any[];
};

function UserCard({
  nickname,
  levelOf3Dae,
  weekdays,
  ableDistricts,
}: UserCardProps) {
  // console.log('weekdays', weekdays.map((elm) => elm.weekday)[0]);
  console.log('ableDistrcts', ableDistricts);

  return (
    <Col xs={20} md={8} css={margin}>
      <Card title={nickname} bordered>
        <p>{levelOf3Dae}</p>
        <p>{weekdays.map((elm) => elm.weekday).join(', ')}</p>
        <p>{ableDistricts.map((elm) => elm.district.nameOfDong).join(', ')}</p>
      </Card>
    </Col>
  );
}

export default UserCard;
