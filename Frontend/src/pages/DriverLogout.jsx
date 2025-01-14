
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const DriverLogout = () => {
    const token = localStorage.getItem('driver-token')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_API_URL}/drivers/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('driver-token')
            navigate('/driver-login')
        }
    })

    return (
        <div>DriverLogout</div>
    )
}

export default DriverLogout