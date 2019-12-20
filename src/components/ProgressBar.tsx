// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Progress } from 'antd';
import fakeData from '../config/fakeData';

type ProgressBarProps = {
  order: number;
};

export default function ProgressBar({ order }: ProgressBarProps) {
  const percentPerQuestion = Math.round(100 / fakeData.inputRegister.length);
  return (
    <div>
      <Progress percent={order * percentPerQuestion} status="active" />
    </div>
  );
}
