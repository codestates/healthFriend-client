const questionList = [
  {
    number: 1,
    subject: 'weekdays',
    question: '운동이 가능한 요일은 언제인가요?',
    answer: ['월', '화', '수', '목', '금', '토', '일'],
    value: [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ],
    isMultiple: true,
    isMeQueryAvailable: true,
    isMeMutateAvailable: false,
    isAvailable: true,
    isCheckbox: true,
    isFilterList: true,
  },
  {
    number: 2,
    subject: 'ableDistricts',
    question: '운동 가능 지역은 어디신가요?',
    answer: ['none'],
    value: ['none'],
    isMultiple: true,
    isMeQueryAvailable: false,
    isMeMutateAvailable: false,
    isAvailable: false,
    isCheckbox: true,
    isFilterList: true,
  },
  {
    number: 3,
    subject: 'levelOf3Dae',
    question: '3대 중량이 어떻게 되세요?',
    answer: [
      '3대가 뭔가요? (생초보)',
      '100~200 (하수)',
      '200~300 (중수)',
      '300~400 (고수)',
      '400이상 (괴물)',
    ],
    value: ['L1', 'L2', 'L3', 'L4', 'L5'],
    isMultiple: false,
    isMeQueryAvailable: true,
    isMeMutateAvailable: true,
    isAvailable: true,
    isCheckbox: true,
    isFilterList: true,
  },
  {
    number: 4,
    subject: 'motivations',
    question: '헬스 친구를 찾는 이유는?',
    answer: ['중량 강화', '다이어트', '친구 찾기', '혼자 하니 심심해서'],
    value: ['WEIGHT_INCREASE', 'WEIGHT_LOSS', 'FIND_FRIEND', 'LONELINESS'],
    isMultiple: true,
    isMeQueryAvailable: true,
    isMeMutateAvailable: false,
    isAvailable: true,
    isCheckbox: true,
    isFilterList: true,
  },
  {
    number: 5,
    subject: 'gender',
    question: '당신의 성별은?',
    answer: ['남자', '여자'],
    value: ['MALE', 'FEMALE'],
    isMultiple: false,
    isMeQueryAvailable: true,
    isMeMutateAvailable: true,
    isAvailable: false,
    isCheckbox: true,
    isFilterList: false,
  },
  {
    number: 6,
    subject: 'openImageChoice',
    question: '사진 공개를 하시겠어요?',
    answer: ['전체 공개', '친구 공개', '비공개'],
    value: ['OPEN', 'FRIEND', 'CLOSE'],
    isMultiple: false,
    isMeQueryAvailable: true,
    isMeMutateAvailable: true,
    isAvailable: true,
    isCheckbox: true,
    isFilterList: true,
  },
  {
    number: 7,
    subject: 'messageToFriend',
    question: '헬친들에게 인사를 남겨주세요!!',
    answer: ['none'],
    value: ['none'],
    isMultiple: false,
    isMeQueryAvailable: true,
    isMeMutateAvailable: true,
    isAvailable: true,
    isCheckbox: false,
    isFilterList: false,
  },
];

export default questionList;