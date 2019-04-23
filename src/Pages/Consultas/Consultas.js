import React, { Component } from 'react';
import { parseJwt } from '../../Services/authenticacao/authenticacao';

const URL   = 'http://localhost:5001/api/Consultas';
class Consultas extends Component {
    constructor(){
        let usuario = parseJwt();
        super();
        this.state = {
        consultas: [],
        Usuario : {
            id: usuario.jti,
            tipo: usuario.Role
        }
        }
    }
    
    componentDidMount(){

        this.carregarConsultas();
        // ApiService
        // .call('Consultas')
        // .getAll()
        // .then(data => {
        //     this.setState({ consultas :  data.data})
        // });
        
    }
    
    carregarConsultas(){
        console.log(this.state.Usuario);
		switch (this.state.Usuario.tipo) {
			case "Comum":
			
            fetch('http://localhost:5001/api/Usuarios/minhasConsultas',
                {
                   method: 'GET',
                   headers: {
                     "Content-Type" : "application/json",
                     "Authorization" :  'Bearer ' + localStorage.getItem("usuario-spmedgroup")
                   }   
                })
               .then(resposta => resposta.json())
               .then(data => this.setState({consultas : data}))
               .catch(erro => console.log(erro))
                break;
            case "Administrador":			
                fetch(URL,
                    {
                       method: 'GET',
                       headers: {
                         "Content-Type" : "application/json",
                         "Authorization" :  'Bearer ' + localStorage.getItem("usuario-spmedgroup")
                       }   
                    })
                   .then(resposta => resposta.json())
                   .then(data => this.setState({consultas : data}))
                   .catch(erro => console.log(erro))
                    break;
			case "Medico":
			
            fetch('http://localhost:5001/api/Medicos/minhasConsultas',
                {
                   method: 'GET',
                   headers: {
                     "Content-Type" : "application/json",
                     "Authorization" :  'Bearer ' + localStorage.getItem("usuario-spmedgroup")
                   }   
                })
               .then(resposta => resposta.json())
               .then(data => this.setState({consultas : data}))
               .catch(erro => console.log(erro))
				break;
			default:
				break;
		}
         
    }

    render(){        
        if(parseJwt() === "Administrador"){                      
            return(
                <div>
                    <div>
                        <table>
                        <tbody>
                        {
                            this.state.consultas.map(function(consulta){
                                return(
                                <tr key={consulta.id}>
                                <td>Código consulta {consulta.id}</td>
                                <td>Crm Médico  {consulta.crmMedico}</td>
                                <td>Id  {consulta.crmMedicoNavigation.idUsuario}</td>
                                <td>Cpf  {consulta.idProntuarioNavigation.cpf}</td>
                                <td>Rg  {consulta.idProntuarioNavigation.rg}</td>
                                <td>Status Consulta {consulta.statusConsultaNavigation.situacao}</td>
                                <td>Resultado  {consulta.resultado}</td>
                                <td>Data da Consulta  {consulta.dataConsulta}</td>
                                </tr>);                            
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                </div>
            );
        }    else {       
                return(
                    //AQUI FAZER UM IF PARA RETORNAR AS CONSULTAS DO MEDICO OU USUARIO
                    <div>
                        <div>
                            <table>
                            <tbody>
                            {
                                this.state.consultas.map(function(consulta){
                                    return(
                                    <tr key={consulta.id}>
                                    <td>Código consulta {consulta.id}</td>
                                    <td>Crm Médico  {consulta.crmMedicoNavigation.crm}</td>
                                    <td>Médico  (pendente){consulta.crmMedicoNavigation.idUsuarioNavigation.id}</td>
                                    <td>Cpf  {consulta.idProntuarioNavigation.cpf}</td>
                                    <td>Rg  {consulta.idProntuarioNavigation.rg}</td>
                                    <td>Status Consulta {consulta.statusConsultaNavigation.situacao}</td>
                                    <td>Resultado  {consulta.resultado}</td>
                                    <td>Data da Consulta  {consulta.dataConsulta}</td>
                                    </tr>);                            
                                })
                            }
                            </tbody>
                            </table>
                        </div>
                    </div>
                );
            }
        }
    }


export default Consultas;