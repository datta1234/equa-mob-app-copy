import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getStringData,
  setStringData,
  removeValue,
  getObjectData,
  setObjectData,
} from './storage';

const AUTH_STORAGE_KEY = '@auth';
const ACCESS_TOKEN_KEY = '@accessToken';
const REFRESH_TOKEN_KEY = '@refreshToken';
const USER_ID_KEY = '@userId';
const TOUR_COMPLETED = '@tourCompleted';

const AuthService = () => {
  // ***** Access Token ***** //
  const setAccessToken = (accessToken) =>
    setStringData(ACCESS_TOKEN_KEY, accessToken);
  const getAccessToken = () => getStringData(ACCESS_TOKEN_KEY);
  const removeAccessToken = () => removeValue(ACCESS_TOKEN_KEY);

  // ***** Refresh Token ***** //
  const setRefreshToken = (refreshToken) =>
    setStringData(REFRESH_TOKEN_KEY, refreshToken);
  const getRefreshToken = () => getStringData(REFRESH_TOKEN_KEY);
  const removeRefreshToken = () => removeValue(REFRESH_TOKEN_KEY);

  // ***** UserId (used in Token query) ***** //
  const setUserId = (userId) => setStringData(USER_ID_KEY, userId);
  const getUserId = () => getStringData(USER_ID_KEY);
  const removeUserId = () => removeValue(USER_ID_KEY);

  const removeTokens = async () => {
    await removeRefreshToken();
    await removeAccessToken();
    await removeUserId();
  };

  const setIsTourCompleted = (value) => setObjectData(TOUR_COMPLETED, value);
  const getIsTourCompleted = () => getObjectData(TOUR_COMPLETED);

  const storeTokens = async (tokens) => {
    await setAccessToken(tokens?.accessToken);
    await setRefreshToken(tokens?.refreshToken);
  };

  // JR *************** OLD *********************************

  const setData = async (data) => {
    try {
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      // console.log(error);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      // console.log(error);
      // error reading value
    }
  };

  const reset = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (error) {
      // console.log(error);
      // error reading value
    }
  };

  return {
    setAccessToken,
    getAccessToken,
    removeAccessToken,
    setRefreshToken,
    getRefreshToken,
    removeRefreshToken,
    storeTokens,
    setUserId,
    getUserId,
    removeUserId,
    removeTokens,
    getIsTourCompleted,
    setIsTourCompleted,
    setData,
    getData,
    reset,
  };
};

export default AuthService();
