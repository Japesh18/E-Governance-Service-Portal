import {useState,useEffect} from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./Index.css";
export default function App()
{
  const [user,setUser]=useState(null);
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const token=params.get("token");
    if (token)
      {
        fetch("http://localhost:8000/api/users/me/", {
        headers:{Authorization: `Bearer ${token}` }
      })
      .then(r=>r.json())
      .then(data=>setUser({...data,token}));
      window.history.replaceState({},"","/");
    }
  },[]);
  return user?(<Dashboard user={user} onLogout={()=>setUser(null)}/>):(<Login onLogin={setUser}/>);
}