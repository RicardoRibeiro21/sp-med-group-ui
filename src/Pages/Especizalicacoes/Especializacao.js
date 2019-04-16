import React, { Component } from 'react';


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
            <div >{
                this.state.listaEspecializacoes.map(function(especializacoes){
                    return(
                    <p>{especializacoes.especializacao}</p>);})}</div>                   
                    </div>
        );
    }
}

export default Especializacao;