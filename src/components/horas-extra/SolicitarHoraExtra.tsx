import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from 'formik'

export const SolicitarHoraExtra = () => {

    const isSubmitting = false; 

    if(localStorage.getItem("token") === null){
        window.location.href = "/"
    }

    return (
        <>
            <div className="card">
                <div className="card-haeder">
                    Solicitar Hora Extra    
                </div>
                <div className="card-body">
                    
                    <Formik
                        initialValues={{ request_date: '', hours: '', description : '' }}
                        onSubmit={(values, { setSubmitting }) =>  console.log(values) }
                    >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label>Ingresa la fecha</label>
                                <Field type="date" name="request_date" className="form form-control" />
                                <ErrorMessage name="request_date" component="div" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Cantidad de horas extras</label>
                                <Field type="text" name="hours" className="form form-control" />
                                <ErrorMessage name="hours" component="div" />
                            </div>
                            <br />
                            <div className="form-group">
                                <label>Descripcion</label>
                                <Field type="text" name="description" className="form form-control" />
                                <ErrorMessage name="description" component="div" />
                            </div>
                            <br />
                            <button type="submit"  className="btn btn-success">Submit</button>
                        </Form>
                    )}     
                    </Formik>     
                </div>
            </div>
        </>
    )
}
