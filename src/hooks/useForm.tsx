import { ChangeEvent, useState } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export const useForm = <T extends Object>(initState : any) => {

    const [formulario, setFormulario] = useState(initState);
    
    const handleChange = ({target}: ChangeEvent<HTMLInputElement>) => {
        const {name, value, type} = target;
        
        if(type ==='checkbox'){
            setFormulario({...formulario, [name]: target.checked});
        }
        setFormulario({...formulario, [name]: value});
    }

    const onSumbit = () => {
        console.log(formulario)
    }

    return {
        formulario,
        handleChange, 
        onSumbit,
        ...formulario // sends the spread operator for use the fields directly in the component
    }

}