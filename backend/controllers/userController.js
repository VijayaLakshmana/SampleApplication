const userService=require("../service/userService");
class UserController {
  async createUser(req, res) {
    try {
      const newUser = await userService.createUser(req.body);
      if (newUser === false) {
        res.status(409).json({ error: "Given Email address is already used" });
        return;
      }
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: "Invalid data" });
    }
  }
  async getUserById(req,res){
    const id = req.params.id;
    try {
      const user = await userService.getUserById(id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}


module.exports=new UserController();


