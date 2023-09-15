import api from '../../../api/conn';

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css'
import RoundedImage from '../../layouts/RoundedImage'

function MyAdoptions() {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
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
    
    return (
        <section>
        <div className={styles.petslist_header}>
            <h1>Minhas adoções</h1>
        </div>
        <div className={styles.petslist_container}>
            {pets.length > 0 && pets.map((pet) => (
                <div key={pet._id} className={styles.petlist_row}>
                    <RoundedImage
                        src={`http://localhost:4000/images/pets/${pet.image[0]}`}
                        alt={pet.name}
                        width="75"                            
                    />
                    <span className='bold'>{pet.name}</span>
                    <div className={styles.contacts}>
                        <p>
                            <span className="bold">Ligue para:</span> {pet.user.phone}
                        </p>
                        <p>
                            <span className="bold">Fale com:</span> {pet.user.name}
                        </p>
                    </div>
                    <div className={styles.actions}>
                        {pet.available ? (
                            <p>Adocao em processo</p>
                        ) : (
                            <p>Parabens por concluir a adocao</p>
                        )}
                    </div>
                </div>

            ))}
            {pets.length === 0 && <p>Ainda nao ha adocao de Pets.</p>}
        </div>
</section>

    )
}

export default MyAdoptions;    