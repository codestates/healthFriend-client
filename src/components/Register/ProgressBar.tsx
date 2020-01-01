import React from 'react';
import { Progress } from 'antd';

import { questionList } from '../../config/fakeData';

type ProgressBarProps = {
  order: number;
};

export default function ProgressBar({ order }: ProgressBarProps) {
  const percentPerQuestion = Math.round(
    100 / questionList.inputRegister.length,
  );
  return (
    <div>
      <Progress percent={order * percentPerQuestion} status="active" />
    </div>
  );
}
