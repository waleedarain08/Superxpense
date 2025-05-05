import axios from 'axios';
import {baseUrl} from './Constant';

export const instance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// GET method
export const get = async (url, params = {}, token = null) => {
  try {
    const config = {
      headers: {},
      params: params,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.get(url, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// POST method
export const post = async (url, body = {}, token = null) => {
  try {
    const config = {
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.post(url, body, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// PUT method
export const put = async (url, body = {}, token = null) => {
  try {
    const config = {
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.put(url, body, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// DELETE method
export const del = async (url, params = {}, token = null) => {
  try {
    const config = {
      headers: {},
      params: params,
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.delete(url, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// PATCH method
export const patch = async (url, body = {}, token = null) => {
  try {
    const config = {
      headers: {},
    };

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const response = await instance.patch(url, body, config);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
