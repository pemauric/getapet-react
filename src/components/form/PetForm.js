import { useState } from 'react';

import formStyles from './Form.module.css'

import Input from './Input.js'
import InputSubmit from './InputSubmit.js'
import Select from './Select';

function PetForm({handleSubmit, petData, btnText}) {
    const [pet, setPet] = useState(petData || {});
    const [preview, setPreview] = useState([]);
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Preto e Branco"]

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setPet({ ...pet, image: [...e.target.files] })
    }

    function handleChange(e) {
        setPet({ ...pet, [e.target.name]: e.target.value })
    }
    
    function handleColor(e) {
        setPet({
            ...pet,
            color: e.target.options[e.target.selectedIndex].text,
        })
    }
    
    const submit = (e) => {
        e.preventDefault()
        
        handleSubmit(pet)
    }
    
    
    return (
        <form onSubmit={submit}>
            <div className={formStyles.form_container}>
                <div className={formStyles.preview_pet_images}>
                    {preview.length > 0
                    ? preview.map((image, index) => (
                    <img
                        src={URL.createObjectURL(image)}
                        alt={pet.name}
                        key={`${pet.name}+${index}`}
                        />
                        ))
                    : pet.image &&
                    pet.image.map((image, index) => (
                        <img
                            src={`http://localhost:4000/images/pets/${image}`}
                            alt={pet.name}
                            key={`${pet.name}+${index}`}
                        />
                    ))}
                </div>
                <Input
                    text="Imagens do Pet"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <Input
                    text="Nome do Pet"
                    type="text"
                    name="name"
                    placeholder="Digite o nome"
                    handleOnChange={handleChange}
                    //value={pet.name || ''}
                />
                <Input
                    text="Idade do Pet"
                    type="number"
                    name="age"
                    placeholder="Digite a idade"
                    handleOnChange={handleChange}
                    //value={pet.age || ''}
                />
                <Input
                    text="Peso do Pet"
                    type="number"
                    name="weight"
                    placeholder="Digite o peso aproximado"
                    //value={pet.weight || ''}
                    handleOnChange={handleChange}
                />
                <Select
                    name="color"
                    text="Selecione a categoria"
                    options={colors}
                    handleOnChange={handleColor}
                    //value={pet.color || ''}
                />
                <InputSubmit
                    value={btnText}
                    type="submit"
                />
            </div>
        </form>
    )
}

export default PetForm;