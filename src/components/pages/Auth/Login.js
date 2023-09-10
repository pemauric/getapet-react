import {useState, useContext} from 'react' 
import { Link } from 'react-router-dom'

import Input from '../../form/Input'
import InputSubmit from '../../form/InputSubmit'

import styles from '../../form/Form.module.css'

import { Context } from '../../../context/UserContext'


function Login() {

    const [user, setUser] = useState({})

    const {login} = useContext(Context)

    function handleChange(e) {  
        setUser({...user, [e.target.name]: e.target.value})
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        login(user)
    }
    return (
        <section className={styles.form_container}>
            <h1>Entrar</h1>
            <form onSubmit={handleSubmit} >
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
                <InputSubmit
                    type="submit"
                    value="Entrar"     
                />
            </form>
            <p>
                Nao tem conta? <Link to="/register"><span class="bold">Clique aqui!</span></Link>
            </p>
        </section>
    )
}

export default Login;