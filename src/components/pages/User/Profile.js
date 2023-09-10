import api from '../../../api/conn'
import {useState, useEffect} from 'react' 

import styles from './Profile.module.css'

import formStyles from '../../form/Form.module.css'
import Input from '../../form/Input'
import InputSubmit from '../../form/InputSubmit'

function Profile () {

    const [user, setUser] = useState({})
    const [token] = useState(localStorage.getItem('token') || "")
    const parseToken = JSON.parse(token)
    

    useEffect(() => {

        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${parseToken}`,
            },
        }).then((response) => {
            setUser(response.data);
            console.log(user)
        })
    }, [parseToken])

    

    function handleChange(e) {  
        //setUser({...user, [e.target.name]: e.target.value})
    }

    function onFileChange(e) {  
    }

    return (
        <section className={styles.profile_container} >
            <div className={styles.profile_header}>
                <h1>Profile</h1>
                <p>Preview de Imagem</p>
            </div>
            <form className={formStyles.form_container}>
                <Input 
                    type="file"
                    text="Imagem"
                    name="image"
                    placeholder="Insira a imagem"
                    id="image"
                    handleOneChange={onFileChange}
                />
                <Input 
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="Insira seu e-mail"
                    id="email"
                    handleOneChange={handleChange}
                    value={user.email || ''}
                />
                <Input 
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Insira seu nome"
                    id="name"
                    handleOneChange={handleChange}
                    value={user.name || ''}
                />
                <Input 
                    type="text"
                    text="Telefone"
                    name="phone"
                    placeholder="Insira seu telefone"
                    id="phone"
                    handleOneChange={handleChange}
                    value={user.phone || ''}
                />
                <Input 
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Insira sua senha"
                    id="password"
                    handleOneChange={handleChange}
                />
                <Input 
                    type="password"
                    text="Confirmar senha"
                    name="confirmpassword"
                    placeholder="Insira sua senha"
                    id="confirmpassword"
                    handleOneChange={handleChange}
                />
                <InputSubmit
                    type="submit"
                    value="Editar"     
                />
            </form>
        </section>
    )
}

export default Profile