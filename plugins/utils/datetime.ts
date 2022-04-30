import moment, { updateLocale } from "moment";

updateLocale("fr", { week: { dow: 1, doy: 4 } });

const formater = (date: string | Date, format = "DD MMMM YYYY") => {
  return moment(date).format(format);
};

export default { formater };
