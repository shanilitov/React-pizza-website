import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Header from "./Header";
import pizza4 from '../img/pizza4.jfif'
import ok from '../img/ok.jpg'
import back from '../img/back.png'

function Pizza() {
    const [add, setadd] = useState([]);
    const [strAddings, setStrAddings] = useState([]);
    const [comment, setcomment] = useState('');
    const [pizza, setpizza] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function getadds() {
            fetch(`http://localhost:3600/menue/get_all_adding`)
                .then(res => res.json())
                .then(ans => {
                    let temp = JSON.parse(ans);
                    if (temp) setadd(temp);
                });
        }
        async function getpizzaitem() {
            fetch(`http://localhost:3600/menue/get_pizza_item`)
                .then(res => res.json())
                .then(ans => {
                    let temp = JSON.parse(ans);
                    if (temp) setpizza(temp[0]);
                });
        }
        getadds();
        getpizzaitem();
    }, []);

    const checked = (a, i) => {
        let t = JSON.parse(a);
        let name = t.name;

        setStrAddings(prevState => {
            if (prevState.includes(name)) {
                return prevState.filter(item => item !== name);
            } else {
                return [...prevState, name];
            }
        });

        console.log(a + ' checked!');
        console.log('name: ' + name);
    };

    const okclick = () => {
        // נוסיף לעגלת הקניות פיצה
        let list = JSON.parse(localStorage.getItem('shopping_cart'));
        if (!list) list = [];

        list.push({
            'key': pizza.id,
            'product': pizza,
            'quantity': 1,
            'addings': strAddings.join(', ')
        });

        localStorage.setItem('shopping_cart', JSON.stringify(list));

        // נוסיף את ההערות והתוספות ל-localStorage
        localStorage.setItem('addings', strAddings.join(', '));
        localStorage.setItem('comment', comment);

        navigate('/shoppingcart');
    };

    return (
        <div>
            <Header />
            <div className="pizza">
                <div>
                    {add.map((a, i) => (
                        <div key={i} className='displayadding'>
                            <input type='checkbox' onChange={() => checked(JSON.stringify(a), i)} />
                            <p style={{ color: 'white' }}>{a.name}</p>
                        </div>
                    ))}
                </div>
                <img src={pizza4} className='pizza4' />
                <div className="bandt">
                    <Link to='/' id="back"><img src={back} className="icon" /></Link>
                    <button onClick={okclick}><img src={ok} className='icon' /></button>
                    <textarea
                        className="text"
                        onChange={(event) => setcomment(event.target.value)}
                        placeholder="WRITE YOUR COMMENTS HERE..."
                    />
                </div>
            </div>
        </div>
    );
}

export default Pizza;
