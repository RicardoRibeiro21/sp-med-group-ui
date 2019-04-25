import React from 'react';
import { Link } from 'react-router-dom';
function MenuNav(){    
        return(
            <div>
                <nav>
                    <ul>
                        <li className="title"><Link>SpMedicalGroup</Link></li>
                        <li><a><Link to="/Especializacoes">Especializacoes</Link></a></li>
                        <li><a><Link to="/Consultas">Minhas Consultas</Link></a></li>
                        <li><a><Link to="/login">Deslogar</Link></a></li>
                    </ul>
                </nav>
            </div>

        )
    }
export default MenuNav;