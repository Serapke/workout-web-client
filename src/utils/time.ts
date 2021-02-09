export const formatTime = (timeElapsed: number): string => {
  if (timeElapsed > 0) {
    let hours = formatTwoDigits(Math.floor((timeElapsed / 60 / 60) % 24), true);
    let minutes = formatTwoDigits(Math.floor((timeElapsed / 60) % 60));
    let seconds = formatTwoDigits(Math.floor((timeElapsed) % 60));

    return `${hours ? `${hours}:` : ''}${minutes}:${seconds}`;
  }
  return '00:00';
};

const formatTwoDigits = (n: number, hideOnZero: boolean = false): string => {
  if (hideOnZero && n === 0) {
    return null;
  }
  return n < 10 ? '0' + n : '' + n;
}