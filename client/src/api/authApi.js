import $api from "../http"

export const authApi = {
    async login({ email, password }) {
      try {
        const response = await $api.post('/login', { email, password });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    
    async registration({ email, password }) {
      try {
        const response = await $api.post('/registration', { email, password })
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  
    async logout() {
      try {
        const response = await $api.post('/logout');
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async checkAuth() {
        try {
            const response = await $api.get('/refresh', {withCredentials: true});
            return response.data
        } catch(error) {
            throw error;
        }
    }
  };