// src/api/auth.js
import http from './http';

const authAPI = {
  // Get all accounts
  getAllAccounts: () => http.get('/accounts'),
  
  // Login (client-side validation)
  login: async (username, password) => {
    try {
      const response = await http.get('/accounts');
      const accounts = response.data;
      
      const user = accounts.find(
        (acc) => acc.username === username && acc.password === password
      );
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: 'Tên đăng nhập hoặc mật khẩu không đúng' };
      }
    } catch (error) {
      return { success: false, error: 'Lỗi kết nối đến server' };
    }
  },
};

export default authAPI;

