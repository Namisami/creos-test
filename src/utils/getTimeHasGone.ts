const getTimeHasGone = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const yearsHasGone = now.getFullYear() - date.getFullYear();
  if (yearsHasGone) return `${yearsHasGone} г. назад`

  const monthsHasGone = now.getMonth() - date.getMonth();
  if (monthsHasGone) return `${monthsHasGone} мес. назад`

  const daysHasGone = now.getDate() - date.getDate();
  if (daysHasGone) return `${daysHasGone} д. назад`

  const hoursHasGone = now.getHours() - date.getHours();
  if (hoursHasGone) return `${hoursHasGone} ч. назад`

  const minutesHasGone = now.getMinutes() - date.getMinutes();
  if (minutesHasGone) return `${minutesHasGone} ч. назад`
};

export default getTimeHasGone;
