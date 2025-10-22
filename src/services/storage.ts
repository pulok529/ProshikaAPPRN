import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'session_userid';

export const Session = {
  async setUserId(userid: string) {
    await AsyncStorage.setItem(USER_KEY, userid);
  },
  async getUserId() {
    return AsyncStorage.getItem(USER_KEY);
  },
  async clear() {
    await AsyncStorage.removeItem(USER_KEY);
  }
};
