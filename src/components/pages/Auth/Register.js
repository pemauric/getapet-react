import {useState} from 'react'

import Input from '../../form/Input'

import InputSubmit from '../../form/InputSubmit';
import styles from '../../form/Form.module.css';


import {Link} from  'react-router-dom'

function Register() {

    const [user, setUser] = useState({})

    function handleChange(e) {  
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(user)
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
                    handleOneChange={handleChange}
                />
                <Input 
                    type="text"
                    text="Telefone"
                    name="phone"
                    placeholder="Insira seu numero"
                    id="phone"
                    handleOneChange={handleChange}
                />
                <Input 
                    type="email"
                    text="E-mail"
                    name="email"
                    placeholder="Insira seu e-mail"
                    id="email"
                    handleOneChange={handleChange}
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