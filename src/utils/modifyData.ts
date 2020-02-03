const modifyData = ({ changeToKorean, levelOf3Dae, gender }) => {
  let healthLevel;
  switch (
    changeToKorean({ levelOf3Dae })
      .match(/\((.*?)\)/g)![0]
      .slice(1, -1)
  ) {
    case '생초보':
      healthLevel = '20%';
      break;
    case '초보':
      healthLevel = '40%';
      break;
    case '중수':
      healthLevel = '60%';
      break;
    case '고수':
      healthLevel = '80%';
      break;
    case '괴물':
      healthLevel = '100%';
      break;
    default:
      break;
  }
  let genderColor = '#ff6b6b';
  if (changeToKorean({ gender }) === '남자') genderColor = '#5075AF';
  return { healthLevel, genderColor };
};

export default modifyData;
