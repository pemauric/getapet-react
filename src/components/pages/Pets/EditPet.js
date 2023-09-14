import PetForm from '../../form/PetForm'
import api from '../../../api/conn';
import styles from './AddPets.module.css'

import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'

function EditPet() {

    const [pet, setPet] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()

    const parseToken = JSON.parse(token)

    useEffect(() => {
        api.get(`/pets/${id}`, {
            headers: {
                Authorization: `Bearer ${parseToken}`,
            },
        })
        .then((response) => {
            setPet(response.data.pet)
            return response.data
        })
        .catch((error) => {
            console.log(error)
        });
    }, [id, token])

    

    async function updatePet() {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(pet).forEach((key) => {
            if (key === 'image') {
                for (let i = 0; i < pet[key].length; i++) {
                    formData.append('image', pet[key][i])
            }
            } else {
                formData.append(key, pet[key])      
            }
        })

        const data = await api.patch(`pets/edit/${pet._id}`, formData, {
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

    }


    return (
        <section>
            <div className={styles.addpet_header}>
                <h1>Editando Pet: {pet.name}</h1>
                <p>Depois da edição os dados serão atualizados no sistema</p>
            </div>
            {pet.name && (
                <PetForm btnText="Editar" petData={pet} handleSubmit={updatePet}/>
            )}

        </section>
    )
}

export default EditPet;