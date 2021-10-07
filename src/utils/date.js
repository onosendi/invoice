const epochToDate = (epochDate) => new Date(epochDate * 1000);

export const getDueDate = ({ epochDate, term }) => {
  const date = epochToDate(epochDate);
  date.setUTCDate(date.getUTCDate() + Number(term));
  return date;
};

export const getDate = (epochDate) => epochToDate(epochDate);
