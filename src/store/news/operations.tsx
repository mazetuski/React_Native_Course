import axios from 'axios';
import * as types from './types';
import { FIREBASE_URL } from '../../misc';

export const getNews = async () => {
  try {
    const response = await axios({
      method: 'GET',
      url: `${FIREBASE_URL}/news.json`,
    });
    const articles = [];
    const articlesData = response.data;

    for (const key in articlesData) {
      articles.push({
        ...articlesData[key],
        id: key,
      })
    }
    return {
      type: types.GET_NEWS,
      payload: articles
    }
  } catch (e) {
    return {
      type: types.GET_ERROR,
    }
  }
};
