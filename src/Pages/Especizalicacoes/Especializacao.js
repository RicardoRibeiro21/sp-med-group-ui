import React, { Component } from 'react';
import MenuNav from "../../Components/menuNav";
import '../../assets/css/especializacoes.css';

class Especializacao extends Component{
    constructor(){
        super();
        this.state = {
            id: "",
            especializacao:"",
            listaEspecializacoes: []
        }
    }
    componentDidMount(){
        this.carregarEspecializacoes();
    }

    carregarEspecializacoes(){
        fetch('http://localhost:5001/api/Especializacao')
        .then(resposta => resposta.json())
        .then(data => this.setState({listaEspecializacoes : data}))
        .catch(erro => {console.log(erro)})
            }

    render(){
        return(
            <div>
            <MenuNav />
            <h1>Especializações</h1>
                <div className="grid">{                
                this.state.listaEspecializacoes.map(function(especializacoes){
                    return(
                    <p className="espec">{especializacoes.especializacao}</p>);})}
                </div>                   
            </div>
        );
    }
}

export default Especializacao;