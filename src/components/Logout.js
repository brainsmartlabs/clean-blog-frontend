import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Logout(props) {

    const navigate = useNavigate();

    useEffect(() => {
        props.setIsLoggedIn(false);
        sessionStorage.clear();
        navigate('/');
    });

   

    return (<h1>Thank you!</h1>)
}

export default Logout;