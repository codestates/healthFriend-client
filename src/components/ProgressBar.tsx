// eslint-disable-next-line
import React, { useState } from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Progress } from 'antd';

export default function ProgressBar() {
  return (
    <div>
      <Progress percent={50} status="active" />;
    </div>
  );
}
