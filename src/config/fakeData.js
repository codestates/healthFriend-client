const questionList = {
  inputRegister: [
    {
      number: 1,
      subject: 'day',
      question: '운동이 가능한 요일은 언제인가요?',
      answer: ['월', '화', '수', '목', '금', '토', '일'],
    },
    {
      number: 2,
      subject: 'place',
      question: '운동 가능 지역은 어디신가요?',
      answer: [],
    },
    {
      number: 3,
      subject: '3dae',
      question: '3대 중량이 어떻게 되세요?',
      answer: [
        '3대가 뭔가요?(생초보)',
        '100~200 (하수)',
        '200~300 (중수)',
        '300~400 (고수)',
        '400이상 (괴물)',
      ],
    },
    {
      number: 4,
      subject: 'reason',
      question: '헬스 친구를 찾는 이유는?',
      answer: [
        '중량 강화',
        '재밌게 운동하고 싶어서',
        '친구 찾기',
        '의지 부족을 이겨내고 싶어서',
      ],
    },
    {
      number: 5,
      subject: 'gender',
      question: '당신의 성별은?',
      answer: ['남자', '여자'],
    },
    {
      number: 6,
      subject: 'introduce',
      question: '마지막으로 헬친들에게 인사를 남겨주세요!!',
      answer: [],
    },
  ],
};

const placeForFindFriends = [
  {
    title: '강남구',
    value: '강남구',
    key: '0-0',
    children: [
      {
        title: '역삼동',
        value: '역삼동',
        key: '0-0-0',
      },
      {
        title: '삼성동',
        value: '삼성동',
        key: '0-0-1',
      },
      {
        title: '대치동',
        value: '대치동',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '용산구',
    value: '용산구',
    key: '0-1',
    children: [
      {
        title: '이태원동',
        value: '이태원동',
        key: '0-1-0',
      },
      {
        title: '한남동',
        value: '한남동',
        key: '0-1-1',
      },
    ],
  },
];

const friendCards = {
  users: [
    // {
    //   id: 1,
    //   nickname: '권용규',
    //   levelOf3Dae: '100',
    //   messageToFriend: '반갑습니다',
    // },
    // {
    //   id: 2,
    //   nickname: '양원석',
    //   levelOf3Dae: '200',
    //   messageToFriend: '같이 해요',
    // },
    // {
    //   id: 3,
    //   nickname: '이수호',
    //   levelOf3Dae: '300',
    //   messageToFriend: '목숨을 걸고 합니다',
    // },
    // {
    //   id: 4,
    //   nickname: '하수빈',
    //   levelOf3Dae: '500',
    //   messageToFriend: '언더아머 입고 오지 마세요',
    // },
  ],
};

export { questionList, placeForFindFriends, friendCards };
