import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import back from '../img/back.png'
import pay from '../img/pay.png'
import delivery from '../img/delivery.png'

function Finish2() {
    //pic up your branch and set the personal detailes and the adress
    const [branch, setbranch] = useState([])
    const [choice, setchoice] = useState([{ 'name': '' }])
    const [name, setname] = useState('')
    const [city, setcity] = useState('')
    const [street, setsrteet] = useState('')
    const [number, setnumber] = useState(-1)
    const state = []

    const navigate = useNavigate()

    useEffect(() => {
        async function getallbranches() {
            fetch('http://localhost:3600/branches/get_all_branches_data')
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    setbranch(temp)
                })
        }
        getallbranches()
    }, state)

    console.log(typeof(number))

    const finish2Click = () => {
        if (name === '' || city === '' || street === '' || number === -1 || choice.name === '') {
            alert('for continue make sure that all the failds are full!')
            console.log('out of function')
        }
        else {
            const order = {
                city: city,
                street: street,
                number: number,
                order_date: new Date(),
                comment: localStorage.getItem('comment'),
                price: localStorage.getItem('price'),
                name: name,
                branch_id: choice.id,
                orderdetails: JSON.parse(localStorage.getItem('shopping_cart'))

            }
            console.log({ order })
            const option = {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            }
            fetch(`http://localhost:3600/orders/create_new_order`, option)
                .then(res => res.json())
                .then(ans => {
                    if (ans) {
                        console.log(ans)
                        localStorage.clear()
                        navigate('/sent')
                    }

                })

        }
    }

    return (
        <div className="finish2">
            <Link to='/finish1'><img src={back} className="myButton" width='50px' /></Link>
            <br />
            <input type='text' placeholder="NAME" onChange={(event) => { setname(event.target.value) }} />
            <div>
                <input type='text' placeholder="CITY" onChange={(event) => { setcity(event.target.value) }} />
                <input type='text' placeholder="STREET" onChange={(event) => { setsrteet(event.target.value) }} />
                <input type='text' placeholder="NUMBER" onChange={(event) => { setnumber(event.target.value) }} />
            </div>
            <div>
                <h1 className="h1inf2">{choice.name}</h1>
                <button onClick={() => { finish2Click() }}><img src={delivery} className="myButton" width='50px' /></button>
            </div>
            <div className="branchesinf2">
                {branch.map((a, i) => {
                    console.log(a)
                    return (
                        <div key={i}>
                            <button onClick={() => { setchoice({ 'id': a.id, 'name': a.name }) }}>
                                <h1>{a.name}</h1>
                                <p>{a.street + ' ' + a.number + ',' + a.city}</p>
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Finish2;