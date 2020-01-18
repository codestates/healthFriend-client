import React from 'react';

import ButtonToFind from './ButtonToFind';
import ButtonToSignup from './ButtonToSignup';
import ButtonToRegister from './ButtonToRegister';

type MainButtonProps = {
  loginData: { isLoggedIn: boolean };
  dataMe: any;
  history: any;
};

export default function MainButton({
  history,
  loginData,
  dataMe,
}: MainButtonProps) {
  if (!loginData.isLoggedIn) {
    return <ButtonToSignup />;
  }
  if (dataMe && dataMe.me && dataMe.me.levelOf3Dae) {
    return <ButtonToFind history={history} />;
  }
  return <ButtonToRegister history={history} />;
}
