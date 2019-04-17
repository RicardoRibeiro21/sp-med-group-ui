import React, { Component } from 'react';
import ApiService from '../../Services/ApiService';

const URL   = 'http://localhost:5001/api/Medicos';
class Cadastros extends Component{
    constructor(){
        super();
        this.state = {
            crmMedico: "",
            dataConsulta: "",
            statusConsulta: 1,
            idProntuario: "",
            listaStatusConsulta: [],
            listaProntuario: []  ,
            listaMedicos: []     
        }
     
    }
    componentDidMount(){
        this.buscarMedicos();
        
    }
    atualizaIdProntuario(event){
        this.setState ({idProntuario : event.target.value})
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
        this.setState({crmMedico : event.target.value});
    }

    cadastrarConsulta(event){
        event.preventDefault();

        ApiService
        .call('Consultas')
        .create( {
            crmMedico : this.state.crmMedico,
            dataConsulta: this.state.dataConsulta ,
            statusConsulta: this.state.statusConsulta,
            idProntuario: this.state.idProntuario
        })
        .then(data => { if(data.status === 200){
            console.log(data + "Consulta cadastrada com sucesso");}
            else{
                alert("Dados preenchidos incorretamente!");
            }
        })
        .catch( erro => console.log(erro))
    }
    render(){
        return(
            <div>
                <form onSubmit = {this.cadastrarConsulta.bind(this)}>
                    <input type="date" placeholder="dd/mm/yyyy" value={this.state.dataConsulta}/>
                    <input type="text" placeholder="Digite o id do prontuário" onChange={this.atualizaIdProntuario.bind(this)} value={this.state.idProntuario}/>                                      
                    <select  value={this.state.crmMedico}  onChange={this.atualizaEstadoCrmMedico.bind(this)}>
                    <option value="0" disabled>Selecione : </option>
                        {
                            this.state.listaMedicos.map((element) => {
                                return <option key={element.crm} value={element.crm}>{element.crm}</option>
                            })
                    }
                    </select>
                    <button>Cadastrar</button>
                </form>
            </div>
        )
    }
}

export default Cadastros;
