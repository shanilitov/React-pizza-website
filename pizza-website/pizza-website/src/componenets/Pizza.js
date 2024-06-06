import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import Header from "./Header";
import Adding from "./Adding";
import pizza4 from '../img/pizza4.jfif'
import ok from '../img/ok.jpg'
import back from '../img/back.png'

function Pizza() {
    const [add, setadd] = useState([])
    const [selected, setselected] = useState([])
    const [existedid, setexistedid] = useState([])
    const [comment, setcomment] = useState('')
    const [pizza, setpizza] = useState()
    const [strAddings, setStrAddings] = useState(['Addings are:\n'])
    const state = []

    const navigate = useNavigate()

    useEffect(() => {
        async function getadds() {
            fetch(`http://localhost:3600/menue/get_all_adding`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp)
                    if (temp)
                        setadd(temp)

                })
        }
        async function getpizzaitem() {
            fetch(`http://localhost:3600/menue/get_pizza_item`)
                .then(res => res.json())
                .then(ans => {
                    console.log(ans)
                    let temp = JSON.parse(ans)
                    console.log(temp[0])
                    if (temp)
                        setpizza(temp[0])
                })
        }

        getadds()
        getpizzaitem()

    }, state)

    const checked = (a, i) => {
        let t = JSON.parse(a)
        // נוסיף את זה כמו מחרוזת
        let str = ''
        if(strAddings[1] == undefined)
            str = JSON.parse(a).name
        else
            str = `, ${JSON.parse(a).name}`
        setStrAddings(prevState => [...prevState, str])

        console.log(a + 'checked!!!!!1')

        console.log('name : ' + JSON.parse(a).name);

        // let currentAdd = {
        //     'key': -1,
        //     'product': a,
        //     'quantity': 1
        // }
        // console.log(`current add: ${JSON.stringify(currentAdd)}`)
        // let e = existedid.find(element => element === currentAdd)
        // console.log(e)
        // if (e === undefined) {
        //     let value = selected
        //     value.push(currentAdd)
        //     setselected(value)
        //     value = existedid
        //     value.push(i)
        // }
        // else {
        //     let index = selected.find(element => element === a)
        //     let value = selected
        //     value.splice(index, 1)
        //     value = existedid
        //     value.splice(e, 1)
        // }
    }
    const okclick = () => {
        // נוסיף לעגלת הקניות פיצה
        let list = JSON.parse(localStorage.getItem('shopping_cart'))
        console.log('current list: ' + list)
        if (list === null)
            list = []
        list.push({
            'key': pizza.id,
            'product': pizza,
            'quantity': 1
        })
        console.log(list)
        localStorage.removeItem('shopping_cart')
        console.log('your list: ' + list)
        localStorage.setItem('shopping_cart', JSON.stringify(list))

        // נוסיף את ההערה שכוללת בצורה מסודרת את התוספות, ואת ההערות שהלקוח כתב.
        list = localStorage.getItem('comment')
        if (list === null)
            list = []
        else {
            console.log(list)
            list = [list]
        }
        let joinedString = strAddings.join('')
        let fCooment = joinedString + 'Client says: "' + comment + '"'

        console.log(fCooment)
        list.push(fCooment)
        console.log(list + 'now insert this to local storege')
        localStorage.removeItem('comment')
        localStorage.setItem('comment', list)
        navigate('/shoppingcart')
    }

    return (
        <div>
            <Header />
            <div className="pizza">
                <div>
                    {
                        add.map((a, i) => {
                            console.log(a)
                            if (a) {
                                return (
                                    // <Adding data={JSON.stringify(a)} key={i} />
                                    <div key={i} className='displayadding'>
                                        <input type='checkbox' onChange={() => { checked(JSON.stringify(a), i) }} />
                                        <p style={{ color: 'white', }}>{a.name}</p>
                                    </div>
                                )
                            }

                        })
                    }
                </div>
                <img src={pizza4} className='pizza4' />
                <div className="bandt">
                    <Link to='/' id="back"><img src={back} className="icon" /></Link>
                    <button onClick={() => { okclick() }}><img src={ok} className='icon' /></button>
                    <textarea
                        className="text"
                        onChange={(event) => { setcomment(event.target.value) }}
                        placeholder="WRITE YOUR COMMENTS HERE..."
                    />

                </div>
            </div>

        </div>
    )
}
export default Pizza;