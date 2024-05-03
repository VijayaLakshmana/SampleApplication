const express=require("express");
// const {
//   getUserById,
//   createUser,
// } =require("../controllers/userController");
// import userController from "../controllers/userController";
const userController=require("../controllers/userController");

const router = express.Router();
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);



module.exports=router;
