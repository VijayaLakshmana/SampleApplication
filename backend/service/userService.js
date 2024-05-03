const userRepository =require("../repository/userRepository");

class UserService {
  async createUser(userData) {
    const existingUser = await userRepository.getUserByEmail(userData.email);
    if (existingUser) {
      return false;
    }
    return userRepository.create(userData);
  }
  async getUserById (id) {
    const user = await userRepository.findById(id);
    return user;
  }
}

module.exports=new UserService();
