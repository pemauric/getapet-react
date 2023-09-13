import api from '../../../api/conn';

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../../../hooks/useFlashMessage'
import PetForm from '../../form/PetForm'


import styles from "./AddPets.module.css"

function AddPets() {

    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const parseToken = JSON.parse(token)
    const navigate = useNavigate()
    

    async function registerPet(pet) {
        let msgType = 'success'
    
        const formData = new FormData
    
        await Object.keys(pet).forEach((key) => {
            if (key === 'image') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append(`image`, pet[key][i])
            }
            } else {
                formData.append(key, pet[key])
            }
        })
    
        const data = await api.post(`/pets/create`, formData, {
                headers: {
                Authorization: `Bearer ${parseToken}`,
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            console.log(response.data)
            return response.data
        })
        .catch((err) => {
            console.log(err)
            msgType = 'error'
            return err.response.data
        })
    
        setFlashMessage(data.message, msgType)

        if(msgType !== 'error') {
            navigate('/pet/mypets')
        }
    }

    return (
        <section >
            <div className={styles.addpet_header}>
                <h1>Cadastrar Pet</h1>
                <p>Depois ele ficara disponivel para adocao</p>
            </div>
                <PetForm  handleSubmit={registerPet} btnText="Cadastrar pet"/>
        </section>
    )
}

export default AddPets;