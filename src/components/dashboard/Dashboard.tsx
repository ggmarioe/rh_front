

export const Dashboard = () => {
    if(localStorage.getItem("token") === null){
        window.location.href = "/"
    }

    return(
        <>
        <div className="container"> 
        <h1>Dashboard</h1>
        
        </div>
            
        </>
    )
}