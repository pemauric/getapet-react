import styles from  './InputSubmit.module.css'

function InputSubmit({className, type, value}) {
    return (
        <input type={type} className={styles.submit} value={value}/>
    )
}

export default InputSubmit