import api, { setBearerToken } from './api';

let userProfile = null;

const AuthService = {
  getProfile: async (secure) => {
    try {
      const response = await api.get('/users');
      userProfile = response.data;
      return userProfile;
    } catch (error) {
        const { response} = error;
        if(secure && response.status === 401 && response.data?.redirect) {
            window.location.href = '/auth/login';
            return null;
        }
      throw error;
    }
  },
  logout: async() => {
      await api.post('/auth/logout');
      userProfile = null;
      setBearerToken(null);
      return { success: true };
  },
  signup:  (data) => {
     return api.post('/auth/signup', data);
  },
  login: (data) => {
     return api.post('/auth/login', data);
  },
  getUserProfile: () => userProfile,


  setUserProfile: (profile) => {
    userProfile = profile;
  },
};

export default AuthService;