import moment from 'moment';

const sortByDate = (a: any, b: any) =>
  ((moment(b.createdAt).valueOf as any) -
    (moment(a.createdAt).valueOf as any)) as any;

export default sortByDate;

// '2020-01-20T03:01:37.665Z';
