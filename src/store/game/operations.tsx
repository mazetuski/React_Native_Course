import axios from 'axios';
import * as types from './types';
import { FIREBASE_URL, convertFirebase, findTeamData } from '../../misc';

export const getGames = async () => {
  try {
    const teamsResponse = await axios({
      method: 'GET',
      url: `${FIREBASE_URL}/teams.json`,
    });
    const gamesResponse = await axios({
      method: 'GET',
      url: `${FIREBASE_URL}/games.json`,
    });
    const teams = convertFirebase(teamsResponse.data);
    const games = convertFirebase(gamesResponse.data);
    const data = [];
    for (const key in games) {
      data.push({
        ...games[key],
        awayData: findTeamData(games[key].away, teams),
        localData: findTeamData(games[key].local, teams),
      })
    }

    return {
      type: types.GET_GAMES,
      payload: data
    }
  } catch (e) {
    console.log(e);
    return {
      type: types.GET_GAMES_ERROR,
      payload: e
    }
  }
};
