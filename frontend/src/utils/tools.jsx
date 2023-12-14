export function getTimeDiff(timestamp) {
  timestamp = new Date(timestamp).getTime();
  const now = new Date();
  const timeDiff = now - timestamp;

  console.log(timeDiff);

  const minuteDiff = Math.floor(timeDiff / 1000 / 60);
  const hourDiff = Math.floor(minuteDiff / 60);
  const dayDiff = Math.floor(hourDiff / 24);
  const monthDiff = Math.floor(dayDiff / 30);
  const yearDiff = Math.floor(monthDiff / 12);

  // 設定時間顯示格式
  let time = "";
  if (yearDiff > 0) {
    time = `${yearDiff} years ago`;
  } else if (monthDiff > 0) {
    time = `${monthDiff} months ago`;
  } else if (dayDiff > 0) {
    time = `${dayDiff} days ago`;
  } else if (hourDiff > 0) {
    time = `${hourDiff} hours ago`;
  } else if (minuteDiff > 0) {
    time = `${minuteDiff} minutes ago`;
  } else {
    time = "just now";
  }
  return time;
}
