/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const tableStyle = css`
  padding: 2px;
`;
const daysTableCss = css`
  padding: 2px;
  margin-top: 10px;
  margin-left: 10px;
`;

type DayTableProps = {
  changeToKorean: Function;
  makeOrder: Function;
  weekdays: any[];
};

const DayTable = ({ changeToKorean, makeOrder, weekdays }: DayTableProps) => {
  const getTableDays = (weekdays) => {
    const days = weekdays
      .map((elm) => changeToKorean({ weekdays: elm.weekday }))
      .sort(makeOrder({ weekdays }));
    return days;
  };
  return (
    <table css={daysTableCss}>
      <tbody>
        <tr>
          {['월', '화', '수', '목', '금', '토', '일'].map((elm) => {
            const [textColor, backColor] =
              getTableDays(weekdays).indexOf(elm) !== -1
                ? ['black', '#fafafa']
                : ['#CCC', '#fafafa'];
            return (
              <td
                css={tableStyle}
                style={{ background: backColor, color: textColor }}
                key={elm}
              >
                {elm}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default DayTable;
