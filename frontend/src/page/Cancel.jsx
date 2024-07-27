import { MdCancel } from "react-icons/md";
import {Link} from "react-router-dom"
export default function Cancel() {
    return (
        <div className='p-40'>
            <div className="card bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 p-10">
            <MdCancel style={{color:"red",fontSize:"45px",marginBottom:"15px"}} />
                <h1 style={{color:"red"}} className="text-xl font-bold  mb-2">Payment Faild</h1>
                <p className="text-gray-600">Payment faild. Please try again or contact support for assistance</p>
                <button style={{backgroundColor:"red",width:"20%"}} className=" text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline" ><Link to='/'>back to home</Link> </button>
            </div>
        </div>
    )
}
