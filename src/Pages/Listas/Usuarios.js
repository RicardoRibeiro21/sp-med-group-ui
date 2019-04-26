import React, {Component} from 'react';
import MenuNav from '../../Components/menuNav';
import '../../assets/css/usuarios.css'
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
            mensagem: "",
            erro: ""        
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
        .then(this.CarregarUsuarios(), this.setState({mensagem: "Cadastro feito com sucesso!"}))
        .catch(this.setState({erromensagem: "Dados preenchidos incorretamente."}))    
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
                    <MenuNav />
                    <div>
                    <h1>Usuários</h1>                    
                        <table>
                        <tbody>
                            <tr>
                                         <th>Id</th>
                                            <th>Nome</th>
                                            <th>Email</th>
                                            <th>Senha</th>
                                            <th>Tipo de Usuário</th>
                                            <th>Data de Nascimento</th>                                            
                                            </tr>    
                        {
                            this.state.listaUsuarios.map(function(usuario){
                                return(
                                <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.nome}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.senha}</td>
                                <td>{usuario.tipoUsuario.tipo}</td>
                                <td>{usuario.dataNascimento}</td>            
                                </tr>);                            
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                     {/* Form para cadastrar Usuarios */}
                     <h2>Cadastro de Usuários</h2>
                <form className="cadastro-user" onSubmit = {this.cadastrarUsuario.bind(this)}>
                    <input type="text" placeholder="Nome do Usuário" onChange={this.atualizaEstadoNome.bind(this)} value={this.state.Nome}/>                                      
                    <input type="text" placeholder="Senha" onChange={this.atualizaEstadoSenha.bind(this)} value={this.state.Senha}/>                                      
                    <input type="text" placeholder="Email" onChange={this.atualizaEstadoEmail.bind(this)} value={this.state.Email}/>                                      
                    <input type="date" placeholder="dd/mm/yyyy" onChange={this.atualizaEstadoDataNascimento.bind(this)} value={this.state.DataNascimento}/>                                       
                    <select className="select-user" value={this.state.IdTipoUsuario}  onChange={this.atualizaEstadoTipoUsuario.bind(this)}>
                    <option>Selecione : </option>
                        {
                            this.state.listaTiposUsuarios.map((element) => {                             
                                return <option key={element.id} value={element.id}>{element.tipo}
                                 </option>                                
                            })
                    }                       
                    </select>
                    <button>Cadastrar</button>
                    <p className="text__login" style={{ color : 'blue',  textAlign : 'center', fontSize : '1.6em' }}>{this.state.mensagem}</p>                
                <p className="text__login" style={{ color : 'red',  textAlign : 'center', fontSize : '1.6em' }}>{this.state.erromensagem}</p>             
            
                </form>
                </div>
            );
        }
    
}
export default Usuarios;