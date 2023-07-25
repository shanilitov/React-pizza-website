import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import back from '../img/back.png'
import ok from '../img/ok.jpg'
import pay from '../img/pay.png'

function Finish1() {
    //display your product and your comment
    const [shoppinglist, setshoppinglist] = useState([])
    const [final, setfinal] = useState(0)
    const [comment, setcomment] = useState([])
    const state = []

    useEffect(() => {
        let getlist = localStorage.getItem('shopping_cart')
        console.log(getlist)
        if (getlist) {
            getlist = JSON.parse(getlist)
            setshoppinglist(getlist)
            let sum = 0
            getlist.map((data, i) => {

                let t = JSON.stringify(data)
                console.log(JSON.parse(t))
                console.log('t' + t)
                let v = JSON.parse(t)
                console.log('t' + v.price)
                sum = sum + v.price;

            })
            setfinal(sum)
            localStorage.setItem('price', JSON.stringify(sum))
        }

        getlist = localStorage.getItem('comment')
        console.log(getlist);
        if (getlist) {
            // getlist = JSON.parse(getlist)
            console.log(getlist);
            setcomment(comment.push(getlist))
        }


    }, state)
    return (
        <div className="finish1">
            <div className="listf1">
                {shoppinglist.map((a, i) => {
                    console.log(a)
                    if (a !== undefined) {
                        return (
                            <div className="finish1p" key={i}>
                                <h1 className="h1f1">{a.name}</h1>
                            </div>
                        )
                    }
                    else {
                        Navigate('/')
                    }
                })}
            </div>
            <div>
                
                
                <Link to='/'><img src={back} className="myButton" width='50px'/></Link>
                <Link to='/pay' > <img src={pay} className='myButton' width='50px'/></Link>
                <div>
                    <textarea onChange={(event) => { setcomment(event.target.value) }}>{comment}</textarea>
                </div>
                <h1>{final + '$'}</h1>
            </div>
        </div>
    )
}
export default Finish1;