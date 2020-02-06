import questionList from '../../../config/questions';

const modifyData = ({ levelOf3Dae, gender }) => {
  const changeToKorean = (data) => {
    const questionIndex: number = questionList
      .map((oneQ) => oneQ.subject)
      .indexOf(Object.keys(data)[0]);
    const optionIndex: number = questionList[questionIndex].value.indexOf(
      Object.values(data)[0] as string,
    );
    return questionList[questionIndex].answer[optionIndex];
  };

  const makeOrder = (data) => {
    const targetQ = questionList.filter(
      (elm) => elm.subject === Object.keys(data)[0],
    )[0];
    const getOrder = (one: string): number => targetQ.answer.indexOf(one);
    return (one: string, two: string): number => getOrder(one) - getOrder(two);
  };

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
  return { healthLevel, genderColor, changeToKorean, makeOrder };
};

export default modifyData;
