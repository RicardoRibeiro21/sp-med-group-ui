import React, { Component } from 'react';
import Axios from 'axios';
import { parseJwt } from '../../Services/authenticacao/authenticacao';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            senha: ""
        }    
    }

    atualizaEstadoEmail(event) {
        //Alterar o estado de minha propriedade
        this.setState({email : event.target.value});
    }
    atualizaEstadoSenha(event) {
        //Alterar o estado de minha propriedade
        this.setState({senha : event.target.value});
    }
    efetualogin(event){
        event.preventDefault();
        // alert(this.state.email + " - " + this.state.senha);

        Axios.post('http://localhost:5001/api/login', {
            email : this.state.email,
            senha : this.state.senha
        })
        .then(data => { if (data.status === 200) 
            {
                console.log(data);
                //Armazenando as informações do usuário no local storage para ser utilizado futuramente
                localStorage.setItem("usuario-spmedgroup", data.data.token);       
                //Role customizada para conseguirmos pegar o link 
                console.log(parseJwt().Role);
                if(parseJwt().Role === "Administrador"){
                    this.props.history.push("/Cadastros/cadastros")
                } else{
                    this.props.history.push("/Especializacoes");                                                
                }                   
            }
             else {
              alert("Email ou senha inválido");
              }
            })
        .catch(erro => {console.log(erro)
        this.setState({ erroMensagem : 'Email ou senha inválido'});
        }
        )
    }
    
    render(){
        return(

            <div>
                <form onSubmit={this.efetualogin.bind(this)}>
                <input type="text" onChange={this.atualizaEstadoEmail.bind(this)} value={this.state.email} placeholder="Insira seu email"></input>
                <input type="password" onChange={this.atualizaEstadoSenha.bind(this)} value={this.state.senha} placeholder="Insira sua senha"></input>
                <button>Entrar</button>
                </form>
            </div>
        )   
    }
}

export default Login; 