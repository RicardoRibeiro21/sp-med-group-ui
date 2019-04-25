import React, { Component } from 'react';
import ApiService from '../../Services/ApiService';
import '../../assets/css/cadastros.css';
import MenuNav from '../../Components/menuNav';

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
            listaMedicos: [],              
        }     
    }
    ///Carregar antes da página
    componentDidMount(){
        this.buscarMedicos();
    

        ApiService
        .call('Medicos')
        .getAll()
        .then(data => {
            this.setState({listaMedicos : data});
        });
    }

    //-----------------------Métodos para cadastrar Consulta------------------------\\ 
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
    //-----------------------Fim para cadastrar Consulta------------------------\\

   

    render(){
        return(
            <div>
                <MenuNav />
                {/* Form para cadastrar Consultas */}
                    <form className="grid-form" onSubmit = {this.cadastrarConsulta.bind(this)}>
                <div><select  value={this.state.CrmMedico}  onChange={this.atualizaEstadoCrmMedico.bind(this)}>
                    <option  >Selecione : </option>
                        {
                            this.state.listaMedicos.map((element) => {
                                return <option key={element.crm} value={element.crm}>{element.idUsuarioNavigation.nome}</option>
                            })
                    }
                    </select></div>                    
                <div><input type="date" placeholder="dd/mm/yyyy" onChange={this.atualizaDataConsulta.bind(this)} value={this.state.dataConsulta}/></div>
                    <div><input type="text" placeholder="Digite o id do prontuário" onChange={this.atualizaIdProntuario.bind(this)} value={this.state.idProntuario}/>                                      </div>
                <div><button>Cadastrar</button></div>
                    
                </form>
                
               
            </div>
        )
    }
}

export default Cadastros;
