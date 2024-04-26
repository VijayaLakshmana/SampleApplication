import Api from "./ApiService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
class SignUpService {
  constructor() {
    this.api = new Api();
    this.userUl = process.env.REACT_APP_USER_URL;
  }
  async userData(regObj, navigate) {
    try {
      console.log(this.userUrl);
      await this.api.post(this.userUl, regObj);
      toast.success("Registered successfully.");
      navigate("/login");
    } catch (err) {
      toast.error("Failed: " + err.message);
    }
  }
}
export default SignUpService;
