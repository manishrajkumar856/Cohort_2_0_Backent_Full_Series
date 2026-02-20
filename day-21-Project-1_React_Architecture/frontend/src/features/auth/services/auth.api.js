/**
 * 4). API Layer
 * This is api layer 
 * This is used to interact with backend only and throw error
 */

import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/auth',
    withCredentials: true,
})

export async function register(username, email, password) {
  try {
    const response = await api.post(
      "/register",
      {
        username,
        email,
        password,
      }
    );
    return response.data;
    
  } catch (error) {
    throw error;
  }
}

export async function login(email, password) {
  try {
    const response = await api.post(
      "/login",
      {
        email,
        password,
      },
    );

    return response.data;

  } catch (error) {
    throw error;
  }
}


export async function getMe() {
    try {
        const response = await api.get('/get-me');
        return response.data;
    } catch (error) {
        throw error;
    }    
}