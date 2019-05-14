import React, {Component } from 'react';
import  MenuNav  from '../../Components/menuNav';
const URL   = 'http://localhost:5001/api/Medicos';
class AtualizarConsultas extends Component{
    constructor(){
        super();
        this.state = {
                consulta: [],
                idConsulta : "",
                CrmMedico: "",
                dataConsulta: "",
                statusConsulta: 1,
                idProntuario: "",
                listaStatusConsulta: [],                
                listaMedicos: [], 
        }
    }

    componentDidMount(){
        this.pegarId();
        this.buscarMedicos();
    }
            pegarId(){
                //Pegando a url atual, cortando o valor que quero e transformando em int
                this.setState({idConsulta: parseInt(document.URL.split('?')[1].split('=')[1])});                                                                                      
            }

            atualizarConsulta(event){
                event.preventDefault();
                
                fetch('http://localhost:5001/api/Consultas', {
                    method: 'PUT',
                    body: JSON.stringify({ 
                        idConsulta: this.state.idConsulta,
                        CrmMedico: this.state.CrmMedico,
                        dataConsulta: this.state.dataConsulta ,
                        statusConsulta: 1,
                        idProntuario: this.state.idProntuario}),
                    headers: {
                        "Content-Type" : "application/json",
                        "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
                    }
                }
                )        
                .then(resposta => resposta, this.setState({mensagem: "Cadastro feito com sucesso!"}))
                .then()
                .catch(this.setState({Erromensagem: "Dados preenchidos incorretamente."}))        
            }
            buscarMedicos(){
                fetch(URL,
                    {
                       method: 'GET',
                       headers: {
                         "Content-Type" : "application/json",
                         "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
                       }   
                    })
                   .then(resposta => resposta.json())
                   .then(data => this.setState({ listaMedicos : data }))
                   .catch(erro => console.log(erro))
               }
        

    render(){
        return(
            <div>
            <MenuNav />
            {/* Form para cadastrar Consultas */}
            <h1>Atualizar Consultas</h1>
                <form className="grid-form" onSubmit = {this.atualizarConsulta.bind(this)}>
            <div><select  value={this.state.CrmMedico}  onChange={CrmMedico => this.setState({CrmMedico})}>
                
                <option  >Selecione o Médico</option>
                    {
                        this.state.listaMedicos.map((element) => {
                            return <option key={element.crm} value={element.crm}>{element.idUsuarioNavigation.nome}</option>
                        })
                }
                </select></div>                    
            <div><input type="date" placeholder="Data da consulta" onChange={dataConsulta => this.setState({dataConsulta})} value={this.state.dataConsulta}/></div>
                <div><input className="prontuarioAtualizar" type="number" placeholder="Id do prontuário" onChange={()=> alert('ce num pode alterar essa merda nao')} value={this.state.idProntuario} disabled/></div>
    
            <div><button>Cadastrar</button></div>
            <p className="text__login" style={{ color : 'green',  textAlign : 'center', fontSize : '1.6em' }}>{this.state.mensagem}</p>                
            <p className="text__login" style={{ color : 'green',  textAlign : 'center', fontSize : '1.6em' }}>{this.state.Erromensagem}</p>                
            
                
            </form>
            
           
        </div>
        )
    }
}

export default AtualizarConsultas;