import AsyncStorage from '@react-native-async-storage/async-storage';

// Set data in AsyncStorage
export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error setting item [${key}]:`, error);
  }
};

// Get data from AsyncStorage
export const getItem = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error getting item [${key}]:`, error);
    return null;
  }
};

export const setStringItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting string item [${key}]:`, error);
  }
};

export const getStringItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting string item [${key}]:`, error);
    return null;
  }
};

// Remove data from AsyncStorage
export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item [${key}]:`, error);
  }
};
