import { useEffect, useState } from "react";
import Acceuil from "../Acceuil";


const Deconnection = () => {
    const [connected,setConnected] = useState(JSON.parse(localStorage.getItem('user')));
   useEffect(()=>{
          connected.isConnected = false;
        
          localStorage.setItem("user",JSON.stringify(connected));
          console.log(localStorage.getItem("user"));
          
          // Rediriger l'utilisateur vers la page d'accueil
           window.location.assign('/');
   },[connected]) 
 return (
    <div>
      <Acceuil />
    </div>
 );
}

export default Deconnection;