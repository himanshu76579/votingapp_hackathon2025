import React from 'react'
// import { useNavigate } from "react-router-dom";

const ElectionLevel = () => {
    const fetchLocation = async() => {
        try{
            const res = await fetch("/api/location");
            console.log(res.data.local)
            console.log(res.data.state)
            console.log(res.data.country)
        }
        catch(error){
            console.log("Error fetching location data:", error);
        }
    }
  return (
    <div>
      
    </div>
  )
}

export default ElectionLevel
