import { useContext } from "react"
import { AuthContext } from "../Context/AuthContext"

export default function useAuthContext() {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("useAuthContext must be used an AuthContextProvider")
    }
    return context
}   
