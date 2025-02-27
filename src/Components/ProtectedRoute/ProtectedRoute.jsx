import { Navigate } from "react-router-dom"
import Login from "../Login/Login"

const ProtectedRoute = ({children}) => {
    if(localStorage.getItem("token") == null){
        return(
            <>
                <Navigate to={"/login"}/>
            </>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute



