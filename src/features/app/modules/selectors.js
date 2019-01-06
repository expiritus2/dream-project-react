export const getLocale = () => {
  const locale = localStorage.getItem("locale");
  return locale ? locale : "en";
};
