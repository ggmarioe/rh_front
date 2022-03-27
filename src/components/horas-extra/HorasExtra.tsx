import { useEffect, useState } from "react"

export const HorasExtra = () => {
    const url = 'http://127.0.0.1:8000/api/extra-hour/'
    const [extraHours, setExtraHours] = useState("")
    const [ message, setMessage ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState("")
    const [ token, setToken ] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("token") as string;
        if(token)
        {
            setToken(token)
        }
    },[])

    if(localStorage.getItem("token") === null){
        window.location.href = "/"
    }

    const getExtraHour = () => {
        const getExtraHour = fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${token}`,
            }
        })
    }
    getExtraHour()
    // const getExtraHour = fetch(url, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `JWT ${token}`,
    //     }
    // })
    // .then(response => {
    //     //validaciones 
    //     if(response.status === 401){
    //         setErrorMessage("Nombre de usuario o contraseña incorrectos")
    //     }

    //     //todo OK
    //     return response.json()
    // })
    // .then(data => {
    //     console.log("data", data)
    //     setExtraHours(data)
    // })
    // .catch(error =>{
    
    // });

    // useEffect(() => {
    //     const token = localStorage.getItem("token") as string;
    //     if(token)
    //     {
    //         setToken(token)
    //     }
    // },[extraHours])

    return(
            <>
            <div className="container">
                <h1>Listado de Horas extra</h1>
                <table className="table">
                    <tbody>
                        

                    </tbody>
                </table>
            </div>
            </>
    )

}