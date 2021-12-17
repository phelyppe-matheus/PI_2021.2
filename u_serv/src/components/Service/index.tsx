import { useState } from 'react'
import { EditServiceForm } from '../ServiceForm'
import styles from './styles.module.scss'
import Edit from '../../resources/images/Edit.svg'


interface IServiceProps {
    service: {
        "id": string;
        "limit": string;
        "description": string;
        "register": string;
        "comments": string;
        "budget": string;
        "title": string;
    };
    deleteFunction: Function;
}

export default function Service({ service, deleteFunction }: IServiceProps) {

    const [editmode, seteditmode] = useState(false)
    const [fields, setfields] = useState(service)

    function handleEditModeService() {
        seteditmode(!editmode)
    }

    return (
        <div className={styles.Container} >
            <h1 className={styles.title} >{fields.title}</h1>
            <h2 className={styles.budget} >{fields.budget}</h2>
            <h4 className={styles.id} >ID {fields.id}</h4>
            <p className={styles.description}>{fields.description}</p>
            <p className={styles.comments}>{fields.comments}</p>
            <p className={styles.register}>{new Date(fields.register).toLocaleDateString()}</p>
            <p className={styles.limit}>{new Date(fields.limit).toLocaleDateString()}</p>
            <img className={styles.edit} onClick={handleEditModeService} src={Edit} alt="Edit" />
            {
                editmode ? <div className={styles.Form}>
                    <EditServiceForm service={service} edit={{ deleteFunction, changeFunction: setfields }} />
                </div> : null
            }
        </div>
    )
}

