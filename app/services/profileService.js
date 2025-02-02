import api from './api';
import AuthService from './authService';

const ProfileService = {

  updateProfile: async ( data) => {
    await api.put(`/users`, data);
      const currentData = AuthService.getUserProfile() ?? {};
      const updatedData = {
        ...currentData,
        ...data,
      };
      AuthService.setUserProfile(updatedData);
      return updatedData;
   
  }
};

export default ProfileService;