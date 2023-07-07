const baseURL =
  "https://api.rawg.io/api/games?key=497c040be67b45198e926652f3bbfc29";

const getCurrentMonth = () => {
  const month = new Date().getMonth() + 1;
  if (month < 10) {
    return `0${month}`;
  }
  return month;
};

const getCurrentDay = () => {
  const day = new Date().getDate();
  if (day < 10) {
    return `0${day}`;
  }
  return day;
};

const currentYear = new Date().getFullYear();
const currentMonth = getCurrentMonth();
const currentDay = getCurrentDay();
const currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
const lastYear = `${currentYear - 1}-${currentMonth}-${currentDay}`;
const nextYear = `${currentYear + 1}-${currentMonth}-${currentDay}`;

const popularGames = `&dates=${lastYear},${currentDate}&ordering=-rating&page_size=9`;
const upcomingGames = `&dates=${currentDate},${nextYear}&ordering=-added&page_size=9`;
const newGames = `&dates=${lastYear},${nextYear}&ordering=-released&page_size=9`;

export const newGamesURL = () => `${baseURL}${newGames}`;
export const popularGamesUrl = () => `${baseURL}${popularGames}`;
export const upcomingGamesUrl = () => `${baseURL}${upcomingGames}`;
export const searchedGameUrl = (gameName) => {
  return `${baseURL}&search=${gameName}&page_size=9`;
};

export const gameDetailsGet = (id) =>
  `https://api.rawg.io/api/games/${id}?key=497c040be67b45198e926652f3bbfc29`;
export const gameScreenshotGet = (id) =>
  `https://api.rawg.io/api/games/${id}/screenshots?key=497c040be67b45198e926652f3bbfc29`;
