import React, {Component} from 'react';

class Medicos extends  Component{
    constructor(){
        super();
        this.state = {
            listaMedicos: [],
            listaUsuarios: [],
            listEspecializacoes: [],
            idClinica: 1,
            crm: "",
            idUsuario: "",
            idEspecializacao: "",
                       
        }        
    }
    //----------------------Métodos de carregamento----------------------\\
    componentDidMount(){
        this.CarregarMedicos();
        this.CarregarEspecializacoes();
        this.CarregarUsuarios();
    }
    CarregarUsuarios(){
        fetch('http://localhost:5001/api/Usuarios',
        {
           method: 'GET',
           headers: {
             "Content-Type" : "application/json",
             "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
           }   
        })
       .then(resposta => resposta.json())
       .then(data => this.setState({listaUsuarios : data}))
       .catch(erro => console.log(erro))
    }
    CarregarMedicos(){
    fetch('http://localhost:5001/api/Medicos',
    {
       method: 'GET',
       headers: {
         "Content-Type" : "application/json",
         "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
       }   
    })
   .then(resposta => resposta.json())
   .then(data => this.setState({listaMedicos : data}))
   .catch(erro => console.log(erro))
    }
    CarregarEspecializacoes(){
    fetch('http://localhost:5001/api/Especializacao ',
        {
           method: 'GET',
           headers: {
             "Content-Type" : "application/json",
             "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
           }   
        })
       .then(resposta => resposta.json())
       .then(data => this.setState({ listEspecializacoes : data }))
       .catch(erro => console.log(erro))
    }
   //----------------------Fim de carregamentos----------------------\\

     //-----------------------Métodos para cadastrar Medico------------------------\\
     cadastrarMedico(event){
        event.preventDefault();                        
        fetch('http://localhost:5001/api/Medicos', {
            
            method: 'POST',
            body: JSON.stringify({ 
                idClinica : this.state.idClinica,
                crm: this.state.crm,
                idUsuario: this.state.idUsuario,
                idEspecializacao: this.state.idEspecializacao
             }),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
            }
        }
        )        
        .then(resposta => resposta)
        .catch( erro => console.log(erro))
        console.log(this.state.medico);
        
       
        
    }
    atualizaEstadoCrm(event){
        this.setState({crm: event.target.value})
    }
    atualizaEstadoIdClinica(event){
        this.setState({IdClinica: event.target.value})
    }
    atualizaEstadoIdUsuario(event){
        this.setState({idUsuario: event.target.value})
    }
    atualizaEstadoIdEspecializacao(event){
        this.setState({idEspecializacao: event.target.value})
    }


    //-----------------------Fim para cadastrar Medico------------------------\\        
        render(){
            return(
                <div>
                    <div>                    
                        <table>
                        <tbody>
                        {
                            this.state.listaMedicos.map(function(medico){
                                return(
                                <tr key={medico.crm}>
                                <td>Crm {medico.crm}</td>
                                <td>Nome {medico.idUsuarioNavigation.nome}</td>
                                <td>Email  {medico.idUsuarioNavigation.email}</td>                                                                
                                <td>Data de Nascimento  {medico.idUsuarioNavigation.dataNascimento}</td>    
                                <td>Especializacao {medico.idEspecializacaoNavigation.especializacao}</td>                                                                
                                </tr>);                            
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                     {/* Form para cadastrar Medicos */}
                <form onSubmit = {this.cadastrarMedico.bind(this)}>
                    <input type="text" placeholder="Crm" value={this.state.crm} onChange={this.atualizaEstadoCrm.bind(this)} />                                                         
                    <select  value={this.state.idEspecializacao}  onChange={this.atualizaEstadoIdEspecializacao.bind(this)}>
                    <option  >Selecione : </option>
                        {
                            this.state.listEspecializacoes.map((element) => {                             
                                return <option key={element.id} value={element.id}>{element.especializacao}
                                 </option>                                
                            })
                    }     
                                      
                    </select>
                    <select type="text" value={this.state.idUsuario}  onChange={this.atualizaEstadoIdUsuario.bind(this)}>
                    <option  >Selecione : </option>
                        {
                            this.state.listaUsuarios.map((element) => {                             
                                return <option key={element.id} value={element.id}>{element.nome}
                                 </option>                                
                            })
                    }     
                                      
                    </select>
                    <button>Cadastrar</button>
                </form>
                </div>
            );
        }
    
}
export default Medicos;