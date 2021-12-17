import { useEffect, useState } from 'react'
import api from '../../api';
import styles from './styles.module.scss'


interface IService {
    "id": string;
    "limit": string;
    "description": string;
    "register": string;
    "comments": string;
    "budget": string;
    "title": string;
}

interface IEditServiceFormProps {
    service: IService;
    edit: {
        deleteFunction: Function;
        changeFunction: Function;
    }
}

interface ICreateServiceFormProps {
    newServiceHandler: Function;
}

export function EditServiceForm({ service, edit }: IEditServiceFormProps) {

    const [limit, setlimit] = useState("");
    const [description, setdescription] = useState("");
    const [comments, setcomments] = useState("");
    const [budget, setbudget] = useState("");
    const [title, settitle] = useState("");

    useEffect(() => {
        const {
            limit,
            description,
            comments,
            budget,
            title
        } = service

        setlimit(limit);
        setdescription(description);
        setcomments(comments);
        setbudget(budget);
        settitle(title);
    }, [])

    function handleEditarButton() {
        if (!limit || !description || !comments || !budget || !title) {
            alert('Formulário incompleto');
            return null;
        }
        const data = {
            register: new Date().toISOString().split('T')[0],
            limit,
            description,
            comments,
            budget,
            title
        }
        api.put(`servicos/${service.id}`, data)
            .then(result => {
                console.log(edit);
                edit.changeFunction({ id: `${service.id}`, ...data });
            })
    }

    function handleDeleteButton() {
        api.delete(`servicos/${service.id}`)
        console.log('tenta ss');

        edit.deleteFunction();
    }

    return (
        <>
            <label htmlFor="title" children="Title" />
            <input type="text" className={styles.title} onChange={input => settitle(input.target.value)} value={title} />
            <label htmlFor="description" children="Description" />
            <input type="text" className={styles.description} onChange={input => setdescription(input.target.value)} value={description} />
            <label htmlFor="budget" children="Budget" />
            <input type="number" className={styles.budget} onChange={input => setbudget(input.target.value)} value={budget} />
            <label htmlFor="comments" children="Comments" />
            <input type="text" className={styles.comments} onChange={input => setcomments(input.target.value)} value={comments} />
            <label htmlFor="limit" children="Limit" />
            <input type="date" className={styles.limit} onChange={input => setlimit(input.target.value)} value={limit} />
            <label htmlFor="register" children="Register" />
            <input type="date" className={styles.register} readOnly={true} value={new Date().toISOString().split('T')[0]} />
            <input type="button" className={styles.ordenar} value={'Editar Serviço'} onClick={handleEditarButton} />
            <input type="button" className={styles.delete} value={'Delete Serviço'} onClick={handleDeleteButton} />
        </>
    )
}


export function CreateServiceForm({ newServiceHandler }: ICreateServiceFormProps) {

    const [limit, setlimit] = useState("");
    const [description, setdescription] = useState("");
    const [comments, setcomments] = useState("");
    const [budget, setbudget] = useState("");
    const [title, settitle] = useState("");

    function handleOrdenarButton() {
        if (!limit || !description || !comments || !budget || !title) {
            alert('Formulário incompleto');
            return null;
        }
        api.post('servicos', {
            register: new Date().toISOString().split('T')[0],
            limit,
            description,
            comments,
            budget,
            title
        })
            .then(response => {
                const data = {
                    id: response.data.id,
                    register: new Date().toISOString().split('T')[0],
                    limit,
                    description,
                    comments,
                    budget,
                    title
                }

                newServiceHandler(data)
            })
    }

    return (
        <>
            <label htmlFor="title" children="Title" />
            <input type="text" className={styles.title} onChange={input => settitle(input.target.value)} value={title} />
            <label htmlFor="description" children="Description" />
            <input type="text" className={styles.description} onChange={input => setdescription(input.target.value)} value={description} />
            <label htmlFor="budget" children="Budget" />
            <input type="number" className={styles.budget} onChange={input => setbudget(input.target.value)} value={budget} />
            <label htmlFor="comments" children="Comments" />
            <input type="text" className={styles.comments} onChange={input => setcomments(input.target.value)} value={comments} />
            <label htmlFor="limit" children="Limit" />
            <input type="date" className={styles.limit} onChange={input => setlimit(input.target.value)} value={limit} />
            <label htmlFor="register" children="Register" />
            <input type="date" className={styles.register} readOnly={true} value={new Date().toISOString().split('T')[0]} />
            <input type="button" className={styles.ordenar} value={'Ordenar Pedido'} onClick={handleOrdenarButton} />
        </>
    )
}
