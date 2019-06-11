import React, { Component } from 'react';
import { parseJwt } from '../../Services/authenticacao/authenticacao';
import '../../assets/css/consultas.css'
import MenuNav from '../../Components/menuNav';

const URL   = 'http://192.168.3.96:5000/api/Consultas';

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
			
            fetch('http://192.168.3.96:5000/api/Usuarios/minhasConsultas',
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
			
            fetch('http://192.168.3.96:5000/api/Medicos/minhasConsultas',
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
        if(parseJwt().Role === "Administrador"){                      
            return(

                <div>
                    <MenuNav />
                    <div>
                        <h1>Consultas</h1>
                        <table className="bordered striped centered">
                        <tbody>
                        <tr>
                                            <th className="Codigo">Código</th>
                                            <th>Crm Médico</th>
                                            <th>Id Médico</th>
                                            <th>Cpf</th>
                                            <th>Rg</th>
                                            <th>Situação da Consulta</th>
                                            <th>Data Da consulta</th>
                                            <th>Resultado</th>
                                            <th>Atualizar</th>
                                            </tr>       
                            
                        {
                            this.state.consultas.map(function(consulta){
                                return(
                                <tr key={consulta.id}>
                                <td className="Codigo"> {consulta.id}</td>
                                <td> {consulta.crmMedicoNavigation.crm}</td>
                                <td> {consulta.crmMedicoNavigation.idUsuario}</td>
                                <td> {consulta.idProntuarioNavigation.cpf}</td>
                                <td>  {consulta.idProntuarioNavigation.rg}</td>
                                <td> {consulta.statusConsultaNavigation.situacao}</td>
                                <td>  {consulta.dataConsulta}</td>
                                <td> {consulta.resultado}</td>
                                <td><a href={`/Consultas/Atualizar?id=${consulta.id}`}>Atualizar</a></td>
                                </tr>);                            
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                </div>
            );
        }    else {       
            if (parseJwt().Role === "Comum") {
                return(
                    //AQUI FAZER UM IF PARA RETORNAR AS CONSULTAS DO MEDICO OU USUARIO
                    <div>
                        <MenuNav />
                        <div>
                            <table>
                            <tbody>
                            <tr>
                                            <th className="Codigo">Código</th>
                                            <th>Crm Médico</th>
                                            <th>Médico (Pendente)</th>
                                            <th>Cpf</th>
                                            <th>Rg</th>
                                            <th>Situação da Consulta</th>
                                            <th>Data Da consulta</th>
                                            <th>Resultado</th>
                                            </tr>       
                            {
                                this.state.consultas.map(function(consulta){
                                    return(
                                    <tr key={consulta.id}>
                                    <td className="Codigo">{consulta.id}</td>
                                    <td>{consulta.crmMedicoNavigation.crm}</td>
                                    <td>{consulta.crmMedicoNavigation.idUsuarioNavigation.id}</td>
                                    <td>{consulta.idProntuarioNavigation.cpf}</td>
                                    <td>{consulta.idProntuarioNavigation.rg}</td>
                                    <td>{consulta.statusConsultaNavigation.situacao}</td>
                                    <td>{consulta.dataConsulta}</td>
                                    <td>{consulta.resultado}</td>
                                    </tr>);                            
                                })
                            }
                            </tbody>
                            </table>
                        </div>
                    </div>
                );
            } else {
                
                return(
                    //AQUI FAZER UM IF PARA RETORNAR AS CONSULTAS DO MEDICO OU USUARIO
                    <div>
                        <MenuNav />
                        <div>
                            <table>
                                <tbody>
                                          <tr>
                                            <th className="Codigo">Código</th>
                                            <th>Medico</th>
                                            <th>Paciente</th>
                                            <th>Cpf</th>
                                            <th>Rg</th>
                                            <th>Situação da Consulta</th>
                                            <th>Data da consulta</th>
                                            <th>Resultado</th>
                                            </tr>                                                                        
                            {
                                this.state.consultas.map(function(consulta){
                                    return(
                                    <tr key={consulta.id}>
                                    <td className="Codigo"> {consulta.id    }</td>
                                    <td>  {consulta.crmMedicoNavigation.crm}</td>
                                    <td>  {consulta.idProntuarioNavigation.idUsuarioNavigation.nome}</td>
                                    <td>  {consulta.idProntuarioNavigation.cpf}</td>
                                    <td>  {consulta.idProntuarioNavigation.rg}</td>
                                    <td> {consulta.statusConsultaNavigation.situacao}</td>
                                    <td> {consulta.dataConsulta}</td>
                                    <td>  {consulta.resultado}</td>
                                    <td><a href={`/Atualizar?id=${consulta.id}`}>Atualizar</a></td>
                                    </tr>
                                    );                            
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
    }


export default Consultas;