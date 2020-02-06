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
  if (
    dataMe &&
    dataMe.me &&
    dataMe.me.motivations.length > 0 &&
    dataMe.me.weekdays.length > 0 &&
    dataMe.me.ableDistricts.length > 0
  ) {
    return <ButtonToFind history={history} />;
  }
  return <ButtonToRegister history={history} />;
}
