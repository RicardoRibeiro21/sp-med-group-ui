import React, { Component } from 'react';
import { parseJwt } from '../../Services/authenticacao/authenticacao';

const URL   = 'http://localhost:5001/api/Consultas';
class Consultas extends Component {
    constructor(){
        super();
        this.state = {
        consultas: []
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
         fetch(URL,
         {
            method: 'GET',
            headers: {
              "Content-Type" : "application/json",
              "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
            }   
         })
        .then(resposta => resposta.json())
        .then(data => this.setState({consultas : data}))
        .catch(erro => console.log(erro))
    }
    render(){
        if(parseJwt().Role === "Administrador"){            
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
                                <td>Crm Médico  {consulta.crmMedico}</td>
                                <td>Id Médico  {consulta.crmMedicoNavigation.idUsuario}</td>
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