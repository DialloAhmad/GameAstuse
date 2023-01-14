import eye from '../assets/eye.png'
import '../Styles/App.css'
import supprimer from '../assets/Supprimer.png'
import valide from '../assets/valide.png'
import {json, Link} from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = "http://localhost:3000/astuces/delete/";

const baseUrlAp = "http://localhost:3000/astuces/approve/"

const Item = ({titre, desc, user, etat, IdAstuce}) => {
  const [userd,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    let description = desc;

  

      
      const handle = () => {
       axios.delete(baseUrl+`?username=${userd.email}&IdAstuce=${IdAstuce}`,
          
                  { headers: {
                    "Authorization" : `Bearer ${userd.token}`,
                   "Content-type": "application/x-www-form-urlencoded"
                   
                } }   
           ).then((response)=>{    
             console.log(response.data);
          }).catch((error)=>{
              console.error(error) 

          }) 
      
      }
      const  approuve = () => {
        axios.post(baseUrlAp+`?username=${userd.email}&IdAstuce=${IdAstuce}`,
          
        { headers: {
          "Authorization" : `Bearer ${userd.token}`,
         "Content-type": "application/x-www-form-urlencoded"
         
      } }   
 ).then((response)=>{    
   console.log(response.data);
}).catch((error)=>{
    console.error(error) 

}) 
      }
  return(
    <tr>
        <td>{titre}</td>
        <td>{description.substring(0, 50)}...</td>
        {user?<td>{etat? "valide ":"Valide"}</td> : <td>{etat? "valide ":"Valide"}</td>  }  {/* cette partie ne s'affiche que s'il c'est l'utilisateur qui veux voir la liste de ses Asctuce */}
        <td> <Link to={`/Consulte/${IdAstuce}`}><img src={eye} alt='Voir plus'  className='eyes'/></Link>
        {user? <a  title="supprimer" oonClick={()=>{handle()}}  ><img src={supprimer} alt='delete'  className='eyes'/></a> :
         <a  title="Voir plus" onClick={()=>{handle()}} ><img src={supprimer} alt='delete'  className='eyes'/></a> 
      
      } {/* cette partie ne s'affiche que s'il c'est l'utilisateur qui veux voir la liste de ses Asctuce */}
        {!user && !etat && <a  title="valide" onClick={()=>{ approuve()}}> <img src={valide} alt='Voir plus'  className='eyes'/> </a> }
        </td>
    </tr>
  )
}

export default Item;