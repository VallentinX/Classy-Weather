function formatDay(date) {
  return new Date(date).toString().slice(0, 3);
}

export default formatDay;
