const User=require("../models/userModel");
// const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const createUser = async (req, res) => {
  const { _id, name,password, email,phone,address,gender } = req.body;
  try {
    const newUser = await User.create({_id, name,password, email,phone,address,gender});
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
};

module.exports = {
  // getAllUsers,
  createUser,
  getUserById
};

// export const updateUser = async (req, res) => {
//   const id = req.params.id;
//   const { name, email, age } = req.body;
//   try {
//     const user = await User.findByIdAndUpdate(
//       id,
//       { name, email, age },
//       { new: true }
//     );
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(400).json({ error: "Invalid data" });
//   }
// };

// export const deleteUser = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const user = await User.findByIdAndDelete(id);
//     if (user) {
//       res.json(user);
//     } else {
//       res.status(404).json({ error: "User not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
