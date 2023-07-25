import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import finish from '../img/finish.jpg'

function Pay(){
    const [credit, setcredit] = useState('-1')
    const [cvv, setcvv] = useState('-1')
    const [date, setdate] = useState('-1')
    const [id, setid] = useState('-1')

    const navigate = useNavigate()

    const buttonClick = ()=>{
        console.log(credit.length)
        console.log(cvv.length)
        console.log(date.length)
        console.log(id.length)
        if (credit.length === 16 ||cvv.toString.length === 3 || date.length === 4 || id.length === 9)  {
            navigate('/finish2')
            
        }
        else{
            alert('check your data!')
        }
    }
    return(
        <div className="pay">
            <input className="inputpay" type='text' placeholder="CREDIT-NUMBER" onChange={(event) => { setcredit(event.target.value) }}/>
            <div>
            <input className="yacvv" type='text' placeholder="CVV" onChange={(event) => { setcvv(event.target.value) }}/>
            <input className="yacvv" type='text' placeholder="YY-MM" onChange={(event) => { setdate(event.target.value) }}/>
            </div>
            <input className="inputpay" type='text' placeholder="ID" onChange={(event) => { setid(event.target.value) }}/>
            <button onClick={()=>{buttonClick()}}><img src={finish} className="myButton" width="70px"/></button>
        </div>
    )
}
export default Pay;