import axios from 'axios';

export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';

export const fetchSessionSuccess = (session) => ({
  type: FETCH_SESSION_SUCCESS,
  payload: session,
});

export const fetchSession = (sessionId) => async (dispatch) => {
  try {
    const response = await axios.get(`/get-user-session?sessionId=${sessionId}`);
    if (response.data.success) {
      dispatch(fetchSessionSuccess(response.data.user));
    } else {
      console.error('Failed to fetch session:', response.data.error);
    }
  } catch (error) {
    console.error('Error fetching session:', error);
  }
};
