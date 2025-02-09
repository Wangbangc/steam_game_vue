
import api from './api';

export const getAllGames = async () => {
  try {
    const response = await api.get('/games/getAll');
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    throw error;
  }
};
export const getGameTypes = async () => {
  try {
    const response = await api.get('/games/types');
    return response.data;
  } catch (error) {
    console.error('Error fetching game types:', error);
    throw error;
  }
};