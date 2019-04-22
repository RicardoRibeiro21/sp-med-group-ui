import React, {Component} from 'react';

class Usuarios extends  Component{
    constructor(){
        super();
        this.state = {
            listaUsuarios: [],
            listaTiposUsuarios: [],
            dataNascimento: "",
            Nome: "",
            Senha:"",
            Email: "",
            IdTipoUsuario:"" ,            
        }        
    }
    componentDidMount(){
        this.CarregarUsuarios();
        this.buscarTipoUsuario();
    }
     //-----------------------Métodos para cadastrar Usuario------------------------\\
     cadastrarUsuario(event){
        event.preventDefault();
        fetch('http://localhost:5001/api/Usuarios', {
            method: 'POST',
            body: JSON.stringify({ Nome: this.state.Nome,
                Email: this.state.Email,
                Senha: this.state.Senha,
                DataNascimento: this.state.DataNascimento,
                IdTipoUsuario: this.state.IdTipoUsuario }),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
            }
        }
        )        
        .then(resposta => resposta)
        .catch( erro => console.log(erro))
        console.log(this.state.Email);
        
       
        
    }
    atualizaEstadoDataNascimento(event){
        this.setState({DataNascimento: event.target.value})
    }
    atualizaEstadoNome(event){
        this.setState({Nome: event.target.value})
    }
    atualizaEstadoEmail(event){
        this.setState({Email: event.target.value})
    }
    atualizaEstadoSenha(event){
        this.setState({Senha: event.target.value})
    }
    atualizaEstadoTipoUsuario(event){
        this.setState({IdTipoUsuario: event.target.value})
    }

    buscarTipoUsuario(){
        fetch('http://localhost:5001/api/TipoUsuario',
            {
               method: 'GET',
               headers: {
                 "Content-Type" : "application/json",
                 "Authorization" : 'Bearer ' + localStorage.getItem("usuario-spmedgroup") 
               }   
            })
           .then(resposta => resposta.json())
           .then(data => this.setState({ listaTiposUsuarios : data }))
           .catch(erro => console.log(erro))
       }
    
    //-----------------------Fim para cadastrar Usuario------------------------\\
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
        
        render(){
            return(
                <div>
                    <div>                    
                        <table>
                        <tbody>
                        {
                            this.state.listaUsuarios.map(function(usuario){
                                return(
                                <tr key={usuario.id}>
                                <td>Id {usuario.id}</td>
                                <td>Nome {usuario.nome}</td>
                                <td>Email  {usuario.email}</td>
                                <td>Senha{usuario.senha}</td>
                                <td>Tipo de Usuário{usuario.tipoUsuario.tipo}</td>
                                <td>Data de Nascimento  {usuario.dataNascimento}</td>            
                                </tr>);                            
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                     {/* Form para cadastrar Usuarios */}
                <form onSubmit = {this.cadastrarUsuario.bind(this)}>
                    <input type="text" placeholder="Nome do Usuário" onChange={this.atualizaEstadoNome.bind(this)} value={this.state.Nome}/>                                      
                    <input type="text" placeholder="Senha" onChange={this.atualizaEstadoSenha.bind(this)} value={this.state.Senha}/>                                      
                    <input type="text" placeholder="Email" onChange={this.atualizaEstadoEmail.bind(this)} value={this.state.Email}/>                                      
                    <input type="date" placeholder="dd/mm/yyyy" onChange={this.atualizaEstadoDataNascimento.bind(this)} value={this.state.DataNascimento}/>                                       
                    <select  value={this.state.IdTipoUsuario}  onChange={this.atualizaEstadoTipoUsuario.bind(this)}>
                    <option  >Selecione : </option>
                        {
                            this.state.listaTiposUsuarios.map((element) => {                             
                                return <option key={element.id} value={element.id}>{element.tipo}
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
export default Usuarios;