import api from '../../api/conn';

import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import styles from './Home.module.css'

function Home() {

    const [pets, setPets] = useState([])

    useEffect(() => {
        api.get('/pets')
            .then((response) =>{
                setPets(response.data.pets);
                console.log(pets);
            })
    }, [])
    
    
    return (
        <section>
            <div className={styles.pet_home_header}>
                <h1>Adote um Pet</h1>
                <p>Veja os detalhes de cada um e conheca o tutor deles</p>
            </div>
            <div className={styles.pet_container}>
                {pets.length > 0 && (
                    pets.map((pet) => (
                        <div className={styles.pet_card}>
                            <div style={{backgroundImage: `url(http://localhost:4000/images/pets/${pet.image})`, }} className={styles.pet_card_image}></div>
                            <h3>{pet.name}</h3>
                            <p>
                                <span className='bold'>Peso: </span>{pet.weight}kg
                            </p>
                            {pet.available ? (
                                <p><Link to={`/pet/${pet._id}`} > Mais detalhes</Link></p>
                            ) : (
                                <p className={styles.adopted_text }>Pet adotado!</p>
                            )}
                        </div>
                    ))
                )}
                {pets.length === 0 && (
                    <p>Nao ha pets cadastrados ou disponiveis para adocao no momento</p>
                )}
            </div>
        </section>
    )
}

export default Home;