import { DateSpreadPipe } from './date-spread.pipe';

const _insertZero = (number) => {
  if (number < 10) {
    return `0${number}`;
  } else {
    return number;
  }
};


describe('DateSpreadPipe', () => {
  let pipe: DateSpreadPipe;
  const date = Date.now();

  const ONE_DAY = 1000 * 3600 * 24;
  const ONE_MONTH = ONE_DAY * 31;
  const ONE_YEAR = ONE_MONTH * 12;

  const formatedNow = date;
  const formatedDayBack = date - ONE_DAY;
  const formatedMonthBack = date - ONE_MONTH;
  const formatedYearBack = date - ONE_YEAR;

  beforeEach(() => {
    pipe = new DateSpreadPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should output "48y" if no value was given', () => {
    expect(pipe.transform('')).toBe('48y');
  });

  it(`Input "${formatedNow}" should transform to "today"`, () => {
    expect(pipe.transform(formatedNow)).toBe('today');
  });

  it(`Input "${formatedDayBack}" should transform to "1d"`, () => {
    expect(pipe.transform(formatedDayBack)).toBe('1d');
  });

  it(`Input "${formatedMonthBack}" should transform to "1m"`, () => {
    expect(pipe.transform(formatedMonthBack)).toBe('1m');
  });

  it(`Input "${formatedYearBack}" should transform to "1y"`, () => {
    expect(pipe.transform(formatedYearBack)).toBe('1y');
  });

});


