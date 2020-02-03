/** @jsx jsx */
import React from 'react';
import { Checkbox } from 'antd';
import { css, jsx } from '@emotion/core';

const checkboxDesign = css`
  border-bottom: 1px solid #ededed;
  padding: 10px 20px;
  display: block;
  line-height: 30px;
  margin: 0 !important;

  &:last-child {
    border-bottom: 0;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #5075af;
    border-color: #5075af;
  }
`;

const QuestionCheckbox = (ele, idx, oneCheckArr, onCheck) => (
  <React.Fragment key={ele}>
    <Checkbox
      value={ele}
      css={checkboxDesign}
      checked={oneCheckArr[idx]}
      onChange={onCheck}
    >
      {ele}
    </Checkbox>
  </React.Fragment>
);

export default QuestionCheckbox;
