import { useEffect } from 'react';
import questionList from '../../config/questions';

type useInfoInputProps = {
  order: number;
  totalCheckArr: [][];
  setTotalCheckArr: (...args: any[]) => void;
  // 왜 뒤에가 void고 앞에는 boolean[]가 안되는지 모르겠음.
};

const useInfoInput = ({
  order,
  totalCheckArr,
  setTotalCheckArr,
}: useInfoInputProps) => {
  const {
    question,
    answer,
    subject,
    isMeMutateAvailable,
    isCheckbox,
  } = questionList.filter((elm) => elm.number === order)[0];

  const oneCheckArr = totalCheckArr[order - 1];
  // 왜 let oneCheckArr를 밖에 선언하고 oneCheckArr = totalCheckArr[order - 1];를 useEffect 안에서 했을때 문제가 발생했던 것인지.

  // totalCheckArr을 일단 빈배열 상태면 다 false로 채우기
  useEffect(() => {
    if (isCheckbox && isMeMutateAvailable && oneCheckArr.length === 0) {
      setTotalCheckArr(
        totalCheckArr.map((elm, idx) => {
          if (subject === 'openImageChoice' && idx + 1 === order) {
            return [false, false, true];
          }
          if (idx + 1 === order) {
            return Array(answer.length).fill(false);
          }
          return elm;
        }),
      );
    }
    // eslint-disable-next-line
  }, [
    answer.length,
    oneCheckArr,
    order,
    setTotalCheckArr,
    totalCheckArr,
    isMeMutateAvailable,
    isCheckbox,
  ]);

  // multiple이 가능한지 여부에 따라 다른 체크박스 항목 클릭시 반응 다르게
  const onCheck = (e) => {
    // 여기도 e에 : MouseEvent 같은거 붙여줘야 함.
    let array: any[];
    const singleChecks = questionList
      .filter((elm) => !elm.isMultiple && elm.isCheckbox)
      .map((ele) => ele.subject);

    if (singleChecks.indexOf(subject) !== -1) {
      array = answer.map((_, i) => answer[i] === e.target.value);
    } else {
      array = answer.map((_, i) =>
        answer[i] === e.target!.value ? !oneCheckArr[i] : oneCheckArr[i],
      );
    }
    setTotalCheckArr(
      totalCheckArr.map((elm, i) => (i + 1 === order ? array : elm)),
    );
  };

  return { onCheck, question, answer, subject, oneCheckArr };
};

export default useInfoInput;
