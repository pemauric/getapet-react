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
        setPet({ ...pet, images: [...e.target.files] })
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
        console.log(pet)
        //handleSubmit(pet)
    }
    
    
    return (
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
                : pet.images &&
                pet.images.map((image, index) => (
                    <img
                        src={`http://localhost:4000/images/pets/${image}`}
                        alt={pet.name}
                        key={`${pet.name}+${index}`}
                    />
                ))}
            </div>
            <form  onSubmit={handleSubmit} >
                <Input
                    text="Imagens do Pet"
                    type="file"
                    name="images"
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <Input
                    type="text"
                    text="Nome"
                    name="name"
                    placeholder="Insira o nome "
                    id="name"
                    handleOnChange={handleChange}
                    value={pet.name || ""}
                />
                <Input
                    type="number"
                    text="Idade"
                    name="age"
                    placeholder="Insira a idade "
                    id="age"
                    handleOnChange={handleChange}
                    value={pet.age || ""}
                />
                <Input
                    type="number"
                    text="Peso"
                    name="weight"
                    placeholder="Insira o peso "
                    id="weight"
                    handleOnChange={handleChange}
                    value={pet.weight || ""}
                />
                <Select
                    text="Selecione a cor"
                    name="color"
                    id="color"
                    options={colors}
                    handleOnChange={handleColor}
                    value={pet.color || ""}
                />
                <InputSubmit
                    type="Submit"
                    value={btnText}
                />
            </form>
        </div>
    )
}

export default PetForm;