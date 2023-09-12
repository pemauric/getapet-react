import {useState, useContext} from 'react'

import Input from '../../form/Input'

import InputSubmit from '../../form/InputSubmit';
import styles from '../../form/Form.module.css';

import {Context} from '../../../context/UserContext'


import {Link} from  'react-router-dom'

function Register() {

    const [user, setUser] = useState({})
    const { register } = useContext(Context)  

    function handleChange(e) {  
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit} >
                <Input 
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Insira seu nome"
                    id="name"
                    handleOnChange={handleChange}
                />
                <Input 
                    type="text"
                    text="Telefone"
                    name="phone"
                    placeholder="Insira seu numero"
                    id="phone"
                    handleOnChange={handleChange}
                />
                <Input 
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="Insira seu e-mail"
                    id="email"
                    handleOnChange={handleChange}
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
                    value="Cadastrar"     
                />
            </form>
            <p>
                Ja tem conta? <Link to="/login"><span class="bold">Clique aqui!</span></Link>
            </p>
        </section>
    )
}

export default Register;