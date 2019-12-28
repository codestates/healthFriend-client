/** @jsx jsx */
import { Row, Col } from 'antd';
import { css, jsx } from '@emotion/core';

import SelectCity from '../components/SelectCity';
import SelectDefault from '../components/SelectDefault';
import ShowFriendList from '../components/ShowFriendList';
import { dataSourceOfFind } from './Data';

const filterCSS = css`
  margin-bottom: 20px;
`;

function FindFriend() {
  return (
    <div>
      <Row type="flex" justify="center" style={{ marginTop: 20 }}>
        <Col xs={20} md={20} css={filterCSS}>
          <Row gutter={24} type="flex" justify="space-between">
            <Col md={9}>
              <SelectCity />
            </Col>
            <Col md={5}>
              <SelectDefault
                dataSource={['월', '화', '수', '목', '금', '토', '일']}
                placeholder="언제 운동이 가능한가요?"
              />
            </Col>
            <Col md={5}>
            <SelectDefault
                dataSource={[100, 200, 300, 400, 500]}
                placeholder="원하는 친구의 3대 중량은?"
              />
            </Col>
            <Col md={5}>
            <SelectDefault
                dataSource={['증량이 목표', '친구 만들기 위해', '다이어트 하기 위해', '언더아머 단속 전문']}
                placeholder="운동 목적은 무엇인가요?"
              />
            </Col>
          </Row>
        </Col>

        <Col xs={20} md={20}>
          <ShowFriendList dataSource={dataSourceOfFind} />
        </Col>
      </Row>
    </div>
  );
}

export default FindFriend;
