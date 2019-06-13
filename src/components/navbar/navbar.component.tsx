import React from 'react'
import { Link} from 'react-router-dom'


export const Navbar = () => {
    return (
         <nav className="nav-wrapper red darken-3">
            <div className= "container">
         
           
    
                <ul className= "right">
                    <li> <Link to ="/"> Home </Link></li>
                    
                    <li> <Link to ="/login"> Login  </Link></li>
                     
                </ul>
            </div>




         </nav>
    )
}

