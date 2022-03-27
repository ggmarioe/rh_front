import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useFormik } from 'formik'
import { setSyntheticTrailingComments } from "typescript"

interface extraHourForm{
    user:string
    date: Date
    hours: number
    description: string
}


export const SolicitarHoraExtra = () => {
    
    const isSubmitting = false; 
    const [ message, setMessage ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ token, setToken ] = useState<string>("");

    useEffect(() =>{
        const token = localStorage.getItem("token") as string;
        if(token)
        {
            setToken(token)
        }
    },[])

    if(localStorage.getItem("token") === null)
        window.location.href = "/"
    
    const submitForm = (val : any) => {
        setMessage("")
        setErrorMessage("")

        const url = "http://127.0.0.1:8000/api/extra-hour/"
        fetch(url, 
        {
            method: 'POST',
            body: JSON.stringify(val),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${token}`,
            }
        })
        .then(response => {
            //validaciones 
            console.log(response)
            if(response.status === 401)
                setErrorMessage("Usuario sin token o token no autorizado")
            //todo OK
            if(response.status === 400)
                setErrorMessage(response.statusText)

            setMessage("Hora extra agregada con éxito")
            return response.json()
        })
        .catch(error =>{
            setErrorMessage(error)
        })
    }
    return (
        <>
            <div className="container">
                <h1>Informar Hora Extra</h1>

                <div className="card">
                    <div className="card-haeder">
                        { errorMessage !== "" &&
                        <div className="alert alert-danger" role="alert">
                             { errorMessage }
                        </div>
                        }
                         { message !== "" &&
                        <div className="alert alert-success" role="alert">
                             { message }
                        </div>
                        }
                    </div>
                    <div className="card-body">
                    
                        <Formik
                            initialValues={{ 
                                    user:2, 
                                    status:'cr', 
                                    date: new Date(),
                                    hours: 0, 
                                    description : '',
                                    created_at: new Date(),
                                    updated_at: new Date()
                                }}  
                            onSubmit={(values, { setSubmitting }) => {
                                //console.log(values)
                                submitForm(values)
                                setSubmitting(false);
                            }}
                        >
                        {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label>Ingresa la fecha</label>
                                <Field 
                                    type="date" 
                                    name="date" 
                                    className="form form-control" />
                                <ErrorMessage name="date" component="div" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Cantidad de horas extras</label>
                                <Field 
                                    type="text" 
                                    name="hours" 
                                    className="form form-control" />
                                <ErrorMessage name="hours" component="div" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Descripcion</label>
                                <Field 
                                    type="text" 
                                    name="description" 
                                    className="form form-control" />
                                <ErrorMessage name="description" component="div" />
                            </div>
                            <br />
                            <button 
                                type="submit" 
                                className="btn btn-success"
                            >Submit</button>
                        </Form>
                        )}     
                        </Formik>     
                    </div>
                </div>
            </div>
        </>
    )
}
