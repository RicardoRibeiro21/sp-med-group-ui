import React, { Component } from 'react';
import Axios from 'axios';
import { parseJwt } from '../../Services/authenticacao/authenticacao';
import logo from '../../assets/imagens/logo.png';
import '../../assets/css/login_styles.css'
import iconGmail from '../../assets/imagens/gmail.svg'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            senha: ""
        }
    }

    atualizaEstadoEmail(event) {
        //Alterar o estado de minha propriedade
        this.setState({ email: event.target.value });
    }
    atualizaEstadoSenha(event) {
        //Alterar o estado de minha propriedade
        this.setState({ senha: event.target.value });
    }
    efetualogin(event) {
        event.preventDefault();
        // alert(this.state.email + " - " + this.state.senha);

        Axios.post('http://localhost:5001/api/login', {
            email: this.state.email,
            senha: this.state.senha
        })
            .then(data => {
                if (data.status === 200) {
                    console.log(data);
                    //Armazenando as informações do usuário no local storage para ser utilizado futuramente
                    localStorage.setItem("usuario-spmedgroup", data.data.token);
                    //Role customizada para conseguirmos pegar o link 
                    console.log(parseJwt());

                    if (parseJwt().Role === "Administrador") {
                        this.props.history.push("/Cadastros/cadastros")
                    } else {
                        this.props.history.push("/Especializacoes");
                    }
                }
                else {
                    alert("Email ou senha inválido");
                }
            })
            .catch(erro => {
                console.log(erro)
                this.setState({ mensagem: 'Email ou senha inválido' });
            }
            )
    }

    render() {
        return (
            <div className="conteudo">
                
                    <div className="apresentacao-left">
                        <div className="grid-auto-rows-1">
                            <div><img src={logo} alt="logo Sp Medical Group" />
                                <p className="titulo">Sp Medical Group</p></div>
                        </div>
                        <div className="footer">
                        <div><img src={iconGmail} className="icones" alt="Icone do gmail" /> <p className="i">SpMedicalGroup</p></div>
                        <div><img src={iconGmail} className="icones" alt="Icone do gmail" /> <p className="i">SpMedicalGroup@gmail.com</p></div>
                    </div>
                    </div>
                <section id="main">
                        <div className="caixa">
                            <div className="text-login">
                                <form onSubmit={this.efetualogin.bind(this)}>
                                    <h2>Login</h2>
                                    <p>Email:</p>
                                    <input type="text" onChange={this.atualizaEstadoEmail.bind(this)} value={this.state.email} placeholder="Insira seu email"></input>
                                    <p>Senha:</p>
                                    <input type="password" onChange={this.atualizaEstadoSenha.bind(this)} value={this.state.senha} placeholder="Insira sua senha"></input>
                                    <p className="text__login" style={{ color : 'red',  textAlign : 'center', fontSize : '0.8em' }}>{this.state.mensagem}</p>
                                    <button value="Entrar">Entrar</button>
                                </form>
                            </div>
                        </div>
                </section>

                  
                
            </div>
        );
    }
}

export default Login; 