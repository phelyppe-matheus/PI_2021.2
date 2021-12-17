import React, { Component } from 'react'

import api from '../../api';
import Service from '../../components/Service'
import styles from './styles.module.scss'
import SettingsIcon from '../../resources/images/Settings.svg'
import { CreateServiceForm } from '../../components/ServiceForm';

interface IService {
    "id": string;
    "limit": string;
    "description": string;
    "register": string;
    "comments": string;
    "budget": string;
    "title": string;
}

export default class Main extends Component {
    state = {
        servicos: Array<IService>(),
        formHidden: false
    }

    handleExit = () => {
        window.location.href = 'https://google.com'
    }

    handleFormSwap = () => {
        const formHidden = !this.state.formHidden
        this.setState({ formHidden })

    }

    addServico = (data: Array<IService>) => {
        const servicos = this.state.servicos.concat(data)
        this.setState({ servicos })
    }

    componentDidMount() {
        api.get('servicos')
            .then(response => this.addServico(response.data))
    }

    render() {
        return (
            <div className={styles.Container}>
                <div className={styles.Header} >
                    <img className={styles.Logo} onClick={this.handleFormSwap} src={SettingsIcon} alt="" />
                    <div className={styles.Sair} onClick={this.handleExit} >SAIR</div>
                </div>
                <div className={styles.ServiceContainer} >
                    {
                        this.state.servicos.map((item, index) => {
                            return <Service key={item.id} service={item} deleteFunction={() => this.setState({
                                servicos: this.state.servicos.filter((value, index, arr) => value !== item)
                            })} />;
                        })
                    }
                </div>
                {this.state.formHidden ?
                    <div className={styles.Form} hidden={true}>
                        <CreateServiceForm newServiceHandler={this.addServico} />
                    </div> : null}
            </div>
        )
    }
}
