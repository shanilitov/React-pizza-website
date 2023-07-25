import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from 'react-router-dom'

function Login() {
    const [name, setname] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate()

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        console.log(response)
        return response.json()
    }

    const subClick = () => {
        let data = {
            'name': name,
            'password': password
        }
        postData('http://localhost:3600/login', data)
            .then(ans => {

                console.log('ans: ' + ans)
                //ans = [{"id":1,"user_name":"malca","password":"123","branch_id":null,"adamin":1}]
                let temp = JSON.parse(ans)
                console.log(temp)
                temp = temp[0]
                console.log(temp)

                if (temp !== undefined) {
                    //if it's the admin he will see the admin viwe
                    if (temp.adamin) {
                        navigate(`/admin`)
                    }
                    //if it's a simple worker we will show the branch view
                    else {
                        navigate(`/shop/${temp.user_name}/${temp.branch_id}`)
                    }
                }
                //if this is no user he will see an annoncment and stay in the same screen
                else {
                    alert('please try again or go to sign-in if you still dont have an account')
                    navigate(`/login`)
                }
            })
    }

    const sighninClick = () => {
        console.log('go to sign-in')
        navigate('/signin')

    }

    return (
        <div>
            <input type="text" placeholder="name" onChange={(event) => { setname(event.target.value) }} className="inputtext"></input>
            <br />
            <input type="password" placeholder="password" onChange={(event) => { setpassword(event.target.value) }} className="inputtext"></input>
            <br />
            <button type="submit" onClick={() => subClick()} className="myButton">LOG IN</button>
            <br />
            <button type="button" onClick={() => sighninClick()} className="myButton">SIGN-IN</button>
        </div>
    )
}

export default Login