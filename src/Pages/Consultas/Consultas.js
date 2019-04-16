import React, { Component } from 'react';

const URL   = 'http://localhost:5001/api/Consultas';
class Consultas extends Component {
    constructor(){
        super();
        this.state = {
        ListaStatusConsulta: [],
        consultas: []
        }
    }
    
    componentDidMount(){
        this.carregarConsultas();
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
                            <td>Prontuário  {consulta.idProntuario}</td>
                            {
                                this.state.ListaStatusConsulta.map((element)=> {
                                    return <td key={element.id} value={element.id}>Status da consulta  {element.}</td> 
                                    
                                })
                            }
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

export default Consultas;