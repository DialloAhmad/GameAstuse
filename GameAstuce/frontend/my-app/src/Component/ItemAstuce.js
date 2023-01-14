import { Button } from 'react-bootstrap';
import datas from '../model/data'
import '../Styles/App.css'
import Item from './Item';
import axios  from 'axios';
import { useEffect, useState } from 'react';


function ItemAstuce({nombre, user, texte}){
    const [users,setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const baseUrl = user  ? `http://localhost:3000/astuces/${users.email}/` : `http://localhost:3000/astuces/all/`;
      const[data,setData]= useState([]);
     useEffect(()=>{
        axios.get(baseUrl+`?username=${users.email}`,
            { headers: {"authorization" : `Bearer ${users.token}`} }).then((reponse)=>{
          
            setData(reponse.data.users.astuces)
             console.log(reponse)
        }) 
     },[])
   

    return(
        <div>
            <h3 className='titleList fw-bold fs-2 text-center mt-1'  >{texte}</h3>
            
            <div className='small_liste shadow  mb-5 bg-white '>
                
                <div className="container-fluid">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead> 
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                          
                                {user?<th>Etat</th>:<th>Etat</th> }   {/* cette partie ne s'affiche que s'il c'est l'utilisateur ou l'admin qui veux voir la liste de ses Asctuce */}
                                <th>Actions</th>
                           
                            </tr>
                        </thead>
                        <tbody>
                            
                        {  data.map((game,index)=>(
                                            <Item  titre={game.titre} IdAstuce={game.IdAstuce}  desc={game.infosAstuce} user={user} etat={game.isApproved} />
                                        ))
                                    }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
                
              {user ? <Button className='btn btn-primary shadow  mb-5 button d-none '>Toutes les actuces</Button> :
              <Button className='btn btn-primary shadow   mb-5 button  d-none'>Toutes les actuces</Button>
              }   
              


        </div>
    )
}

export default ItemAstuce;