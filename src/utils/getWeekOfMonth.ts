const getWeekOfMonth = () => {
  return Math.floor(new Date().getDate() / 7) + 1;
};

export default getWeekOfMonth;
