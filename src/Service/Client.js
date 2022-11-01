import axios from "axios"

export function getAllClient (){
     axios.get('http://localhost:3001/client').then((res)=>{
            return res.data
     }).catch((err)=>{
        console.log(err)
        return null
     })

}

