import Login from "../LoginPage/Login";
export default function PrivateRoute({children}){
  let username = sessionStorage.getItem("username");
  if(username){return children }
  else{ return <Login/>}
}