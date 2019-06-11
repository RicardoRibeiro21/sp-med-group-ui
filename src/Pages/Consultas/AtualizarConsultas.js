import React, { Component } from 'react';
import MenuNav from '../../Components/menuNav';

const URL = 'http://192.168.3.96:5000/api/Medicos';
class AtualizarConsultas extends Component {
    constructor() {
        super();
        this.state = {
            consulta: [],
            idConsulta: "" , 
            CrmMedico: "",
            dataConsulta: "",
            statusConsulta: "",
            idProntuario: "",
            resultado: "",
            listaStatusConsulta: [],
            listaMedicos: [],
        }
    }

    componentDidMount() {
        this.pegarId();
        this.buscarMedicos();
        this.carregarStatusConsulta();
    }
    pegarId() {
        //Pegando a url atual, cortando o valor que quero e transformando em int                
        this.setState({ idConsulta: parseInt(document.URL.split('?')[1].split('=')[1])})          
    }

    atualizarConsulta(event) {
        event.preventDefault();

        fetch('http://192.168.3.96:5000/api/Consultas', {
            method: 'PUT',
            body: JSON.stringify({
                id: this.state.idConsulta,
                crmMedico: this.state.CrmMedico,
                dataConsulta: this.state.dataConsulta,
                statusConsulta: this.state.statusConsulta,
                resultado: this.state.resultado
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + localStorage.getItem("usuario-spmedgroup")
            }
        }
        )
            .then(resposta => resposta)
            .then(this.setState({ mensagem: "Atualização feita com sucesso!" }))
            .catch(this.setState({ Erromensagem: "Dados preenchidos incorretamente. Tente novamente." }))
        console.log(this.state.consulta)
    }
    buscarMedicos() {
        fetch(URL,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem("usuario-spmedgroup")
                }
            })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaMedicos: data }))
            .catch(erro => console.log(erro))
    }
    carregarStatusConsulta() {
        fetch("http://192.168.3.96:5000/api/StatusConsulta",
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + localStorage.getItem("usuario-spmedgroup")
                }
            })
            .then(resposta => resposta.json())
            .then(data => this.setState({ listaStatusConsulta: data }))
            .catch(erro => console.log(erro))
    }
    atualizaResultado(event) {
        this.setState({ resultado: event.target.value })
    }
    atualizaStatusConsulta(event) {
        this.setState({ statusConsulta: event.target.value })
    }
    atualizaCrmMedico(event) {
        this.setState({ CrmMedico: event.target.value })
    }
    atualizaData(event) {
        this.setState({ dataConsulta: event.target.value })
    }

    render() {
        return (
            <div>
                <MenuNav />
                {/* Form para cadastrar Consultas */}
                <h1>Atualizar Consultas</h1>
                <form className="grid-form" onSubmit={this.atualizarConsulta.bind(this)}>
                    <div><select value={this.state.CrmMedico} onChange={this.atualizaCrmMedico.bind(this)}>
                        <option>Selecione o Médico</option>
                        {
                            this.state.listaMedicos.map((element) => {
                                return <option key={element.crm} value={element.crm}>{element.idUsuarioNavigation.nome}</option>
                            })
                        }
                    </select></div>
                    <div><select value={this.state.statusConsulta} onChange={this.atualizaStatusConsulta.bind(this)}>
                        <option  >Selecione a situação da consulta</option>
                        {
                            this.state.listaStatusConsulta.map((element) => {
                                return <option key={element.id} value={element.id}>{element.situacao}</option>
                            })
                        }
                    </select></div>
                    <div><input type="date" placeholder="Data da consulta" onChange={this.atualizaData.bind(this)} value={this.state.dataConsulta} /></div>
                    <div><input className="consultaAtualizar"  type="number" placeholder={"Id da consulta:   " + parseInt(document.URL.split('?')[1].split('=')[1])} onChange={() => alert('você não pode alterar essa merda não')} disabled /></div>
                    <div><input type="text" onChange={this.atualizaResultado.bind(this)} value={this.state.resultado} placeholder="Resultado da consulta" /></div>
                    <div><button>Atualizar</button></div>
                    <p className="text__login" style={{ color: 'green', textAlign: 'center', fontSize: '1.6em' }}>{this.state.mensagem}</p>
                    <p className="text__login" style={{ color: 'red', textAlign: 'center', fontSize: '1.6em' }}>{this.state.Erromensagem}</p>
                </form>
            </div>
        )
    }
}

export default AtualizarConsultas;