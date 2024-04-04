import Api from "./ApiService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
class SignUpService {
  constructor() {
    this.api = new Api();
    this.userUrl = process.env.REACT_APP_USER_URL;
  }
  async userData(regObj, navigate) {
    try {
      await this.api.post(this.userUrl, regObj);
      toast.success("Registered successfully.");
      navigate("/login");
    } catch (err) {
      toast.error("Failed: " + err.message);
    }
  }
}
export default SignUpService;
