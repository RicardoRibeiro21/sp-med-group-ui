import React, { Component } from 'react';
import ApiService from '../../Services/ApiService';
import Axios from 'axios';

const URL   = 'http://localhost:5001/api/Medicos';
class Cadastros extends Component{
    constructor(){
        super();
        this.state = {
            CrmMedico: "",
            dataConsulta: "",
            statusConsulta: 1,
            idProntuario: "",
            listaStatusConsulta: [],
            listaProntuario: [] ,
            listaMedicos: []     
        }     
    }
    componentDidMount(){
        this.buscarMedicos();

        ApiService
        .call('Medicos')
        .getAll()
        .then(data => {
            this.setState({listaMedicos : data});
        });
    }
    atualizaIdProntuario(event){
        this.setState ({idProntuario : event.target.value})
    }
    atualizaDataConsulta(event){
        this.setState ({dataConsulta : event.target.value})
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
       atualizaEstadoCrmMedico(event){
        this.setState({CrmMedico : event.target.value});
    }
    cadastrarConsulta(event){
        event.preventDefault();
        
        fetch('http://localhost:5001/api/Consultas', {
            method: 'POST',
            body: JSON.stringify({ CrmMedico: this.state.CrmMedico,
                dataConsulta: this.state.dataConsulta ,
                statusConsulta: 1,
                idProntuario: this.state.idProntuario}),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
            }
        }
        )        
        .then(resposta => resposta)
        .catch( erro => console.log(erro))
        console.log(this.state.CrmMedico);
    }

    cadastrarUsuario(event){
        event.preventDefault();

        let usuario = {
            nome: this.state.Nome,
            email: this.state.Email,
            senha: this.state.Senha,
            dataNascimento: this.state.dataNascimento,
            idTipoUsuario: 1
        }

        Axios.post('http://localhost:5001/api/Usuarios');

        console.log(usuario);
    }
    atualizaEstadoDataNascimento(event){
        this.setState({dataNascimento: event.target.value})
    }
    atualizaEstadoNome(event){
        this.setState({nome: event.target.value})
    }
    atualizaEstadoDataEmail(event){
        this.setState({email: event.target.value})
    }
    atualizaEstadoDataSenha(event){
        this.setState({senha: event.target.value})
    }

    render(){
        return(
            <div>
                <form onSubmit = {this.cadastrarConsulta.bind(this)}>
                    <input type="date" placeholder="dd/mm/yyyy" onChange={this.atualizaDataConsulta.bind(this)} value={this.state.dataConsulta}/>
                    <input type="text" placeholder="Digite o id do prontuário" onChange={this.atualizaIdProntuario.bind(this)} value={this.state.idProntuario}/>                                      
                    <select  value={this.state.CrmMedico}  onChange={this.atualizaEstadoCrmMedico.bind(this)}>
                    <option  >Selecione : </option>
                        {
                            this.state.listaMedicos.map((element) => {
                                return <option key={element.crm} value={element.crm}>{element.idUsuarioNavigation.nome}</option>
                            })
                    }
                    </select>
                    <button>Cadastrar</button>
                </form>
                
                {/* Form para cadastrar Usuarios */}
                <form onSubmit = {this.cadastrarUsuario.bind(this)}>
                    <input type="text" placeholder="Nome do Paciente" onChange={this.atualizaEstadoNome.bind(this)} value={this.state.Nome}/>                                      
                    <input type="text" placeholder="Senha" onChange={this.atualizaEstadoSenha.bind(this)} value={this.state.Senha}/>                                      
                    <input type="text" placeholder="Email" onChange={this.atualizaEstadoEmail.bind(this)} value={this.state.Email}/>                                      
                    <input type="date" placeholder="dd/mm/yyyy" onChange={this.atualizaEstadoDataNascimento.bind(this)} value={this.state.Nascimento}/>                                       
                    <button>Cadastrar</button>
                </form>
            </div>
        )
    }
}

export default Cadastros;
