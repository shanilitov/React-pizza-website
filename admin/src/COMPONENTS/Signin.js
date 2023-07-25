import React, { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from 'react-router-dom'

function Singin() {

    const [name, setname] = useState('');
    const [branch, setbranch] = useState();
    const [password, setpassword] = useState('');
    const [password2, setpassword2] = useState('');
    const [branches, setbranches] = useState([])
    const [state, setstate] = useState([])
    const navigate = useNavigate()



    useEffect(() => {
        async function getBraches() {
            fetch(`http://localhost:3600/branches/info`)
                //ans = [{branch name, branch id}]
                .then(res => res.json())
                .then(ans => {
                    console.log(typeof (ans))
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    setbranches(temp)
                })
        }

        getBraches()
        const selectbranch = () => {
            branches.forEach((a, i) => {
                return (
                    <select name="select" onClick={() => setbranch(i)}>{a.name}</select>
                )
            })
        }
        select = selectbranch()
    }, state)

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
        return response.json()
    }

    const subClick = () => {
        if (password === password2 && name !== '' && password !== '' && branch !== undefined) {
            console.log(branch)
            const data = {
                'name': name,
                'password': password,
                'branch': branch
            }
            console.log(data)
            postData(`http://localhost:3600/signin`, data)
                .then(
                    //ans = seceed: true/false
                    ans => {
                        if (ans) {
                            navigate(`/shop/${name}/${branch}`)
                        }
                        else {
                            alert('sign in fail please try again or go to log in if you already have an accont')
                            navigate('/signin')
                        }
                    }
                )
        }
        else {
            if (name === '') {
                alert('name is requir faild!')
            }
            if (password === '') {
                alert('common put your password in, dont play with me!')
            }
            if (password != password2 && password !== '') {
                alert('the password dont match please try again!')
            }
            if (branch === undefined) {
                alert('please pick up your branch!')
            }
        }
    }


    let select;
    return (
        <div>
            <input type="text" placeholder="name" onChange={(event) => { setname(event.target.value) }} className="inputtext" />
            <br />
            <label htmlFor="select">branch</label>
            <div className="radiodiv">
                {branches.map((a, i) => {
                    return (
                        <div className="oneselect" key={i}>
                            <input name="radio" type="radio" key={i} value={a.name} onClick={() => { setbranch(a.id) }} />
                            <p className="branchselect">{a.name}</p>
                        </div>
                    )
                })}
            </div>
            <br />
            <input className="inputtext" type="password" placeholder="password" onChange={(event) => { setpassword(event.target.value) }} />
            <br />
            <input className="inputtext" type="password" placeholder="confirm password" onChange={(event) => { setpassword2(event.target.value) }} />
            <br />
            <button type="submit" onClick={() => subClick()} className="myButton">SIGN-IN</button>
            <br />
            <button type="button" onClick={() => { navigate('/login') }} className="myButton">LOG-IN</button>
        </div>
    )
}
export default Singin