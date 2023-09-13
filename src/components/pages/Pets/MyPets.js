import api from '../../../api/conn';
import styles from './Dashboard.module.css'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layouts/RoundedImage';



function MyPets() {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()
    const parseToken = JSON.parse(token)

    useEffect(() =>{
        api.get('/pets/mypets', {
            headers: {
                Authorization: `Bearer ${parseToken}`,
            }
        })
        .then((response) =>{
            setPets(response.data.pets)
        })
    }, [token]);

    async function removePet(id){

        let msgType = 'success'

        const data = await api.delete(`/pets/remove/${id}`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            const updatedPets = pets.filter((pet) => pet._id != id)
            setPets(updatedPets)
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
        <section >
            <div className={styles.petslist_header}>
                <h1>MyPets</h1>
                <Link to="/pet/add">Cadastrar Pet</Link>
            </div>
            <div className={styles.petslist_container}>
                {pets.length > 0 && 
                    pets.map((pet) => (
                        <div key={pet._id}  className={styles.petlist_row}  >
                            <RoundedImage
                                src={`http://localhost:4000/images/pets/${pet.image[0]}`}
                                alt={pet.name}
                                width="75"                            
                            />
                            <span className='bold'>{pet.name}</span>
                            <div className={styles.actions}>
                                {pet.available ? (
                                    <>
                                        {pet.adopter && (
                                            <button>Concluir adocao</button>
                                        )}
                                        <Link to={`/pet/edit/${pet._id}`}><button>Editar</button></Link>
                                        <button onClick={() => {
                                            removePet(pet._id)
                                        }}>Excluir</button>
                                    </>
                                ) 
                                :   
                                (
                                    <p>Pet ja adotado</p>
                                )}
                            </div>
                        </div>
                    ) )
                }
                {pets.length === 0 && 
                    <p>Nao ha Pets</p>
                }
                
            </div>
        </section>
    )
}

export default MyPets;