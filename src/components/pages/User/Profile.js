import api from '../../../api/conn'
import {useState, useEffect} from 'react' 

import styles from './Profile.module.css'

import formStyles from '../../form/Form.module.css'
import Input from '../../form/Input'
import InputSubmit from '../../form/InputSubmit'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layouts/RoundedImage'

//import dotenv from 'dotenv';
//dotenv.config();


function Profile () {

    const [user, setUser] = useState({})
    const [preview, setPreview] = useState("")
    const [token] = useState(localStorage.getItem('token') || "")
    const {setFlashMessage} = useFlashMessage()
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
        setUser({...user, [e.target.name]: e.target.value})
    }

    function onFileChange(e) {  
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'success'

        let msgText = 'Dados alterado com sucesso'

        const formData = new FormData()

        await Object.keys(user).forEach((key) => {
            formData.append(key, user[key])
        })

        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${parseToken}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            return response.data
        }).catch((error) => {
            console.log(error)
            msgText = error.response.data.message
            msgType = 'error'
        });

        setFlashMessage(msgText, msgType)
    }

    return (
        <section className={styles.profile_container} >
            <div className={styles.profile_header}>
                {(user.image || preview ) && (
                    <RoundedImage src={preview ? URL.createObjectURL(preview)  : `http://localhost:4000/images/users/${user.image}`} alt={user.name} />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyles.form_container}>
                <Input 
                    type="file"
                    text="Imagem"
                    name="image"
                    id="image"
                    handleOnChange={onFileChange}
                />
                <Input 
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="Insira seu e-mail"
                    id="email"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input 
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Insira seu nome"
                    id="name"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input 
                    type="text"
                    text="Telefone"
                    name="phone"
                    placeholder="Insira seu telefone"
                    id="phone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <Input 
                    type="password"
                    text="Senha"
                    name="password"
                    placeholder="Insira sua senha"
                    id="password"
                    handleOnChange={handleChange}
                />
                <Input 
                    type="password"
                    text="Confirmar senha"
                    name="confirmpassword"
                    placeholder="Insira sua senha"
                    id="confirmpassword"
                    handleOnChange={handleChange}
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