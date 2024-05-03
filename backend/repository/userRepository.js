const User=require("../models/userModel");
class UserRepository {
  findById(id) {
    return User.findById(id);
  }
  getUserByEmail(email) {
    return User.findOne({ email });
  }
  create(userData){
    return User.create(userData);
  }
}
module.exports=new UserRepository();