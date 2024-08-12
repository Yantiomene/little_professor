import axios from "axios";

const API_URL = "http://localhost:5000/";

export const registerUser = async (username) => {
  try {
    const response = await axios.post(`${API_URL}register`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error.message);
    return { error: error.message };
  }
};

export const loginUser = async (username) => {
  try {
    const response = await axios.post(`${API_URL}login`, {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

export const fetchQuestion = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}question`, {
      params: {
        user_id: userId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
  }
};

export const submitAnswer = async (userId, problem, answer) => {
  try {
    const response = await axios.post(`${API_URL}answer`, {
      user_id: userId,
      problem,
      answer,
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting answer:", error);
  }
};
