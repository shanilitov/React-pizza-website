import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import back from '../img/back.png';
import pay from '../img/pay.png';
import delivery from '../img/delivery.png';
import '../CSS/Finish2.css';

function Finish2() {
    const [branch, setBranch] = useState([]);
    const [choice, setChoice] = useState({ 'name': '' });
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState(-1);
    const [phone, setPhone] = useState(0);
    const [takeAway, setTakeAway] = useState(false);
    const state = [];

    const navigate = useNavigate();

    useEffect(() => {
        async function getAllBranches() {
            fetch('http://localhost:3600/branches/get_all_branches_data')
                .then(res => res.json())
                .then(ans => {
                    console.log(ans);
                    let temp = JSON.parse(ans);
                    console.log(temp);
                    setBranch(temp);
                });
        }
        getAllBranches();
    }, state);

    console.log(typeof(number));

    const finish2Click = () => {
        if (name === '' || city === '' || street === '' || number === -1 || choice.name === '') {
            alert('for continue make sure that all the fields are full!');
            console.log('out of function');
        } else {
            const order = {
                phone: phone,
                city: city,
                street: street,
                number: number,
                order_date: new Date().toISOString().split('T')[0],
                comment: localStorage.getItem('comment'),
                price: localStorage.getItem('price'),
                name: name,
                branch_id: choice.id,
                orderdetails: JSON.parse(localStorage.getItem('shopping_cart')),
                takeAway: takeAway, 
                addings: localStorage.getItem('addings')
            };
            console.log({ order });
            const option = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            };
            fetch(`http://localhost:3600/orders/create_new_order`, option)
                .then(res => res.json())
                .then(ans => {
                    if (ans) {
                        console.log(ans);
                        localStorage.clear();
                        navigate('/sent');
                    }
                });
        }
    };

    return (
        <div className="finish2">
            <div className="form-container">
                <Link to='/finish1'><img src={back} className="myButton" width='50px' /></Link>
                <input type='text' placeholder="NAME" onChange={(event) => { setName(event.target.value); }} />
                <input type='text' placeholder="CITY" onChange={(event) => { setCity(event.target.value); }} />
                <input type='text' placeholder="STREET" onChange={(event) => { setStreet(event.target.value); }} />
                <input type='text' placeholder="NUMBER" onChange={(event) => { setNumber(event.target.value); }} />
                <input type='text' placeholder="Phone Number" onChange={(event) => { setPhone(event.target.value); }} />
            </div>
            
            <div className="buttons-container">
                <div className="branchesinf2">
                    {branch.map((a, i) => (
                        <button
                            key={i}
                            onClick={() => { setChoice({ 'id': a.id, 'name': a.name }); }}
                            style={choice.id === a.id ? { backgroundColor: 'green', color: 'white' } : {}}
                        >
                            <h1>{a.name}</h1>
                            <p>{a.street + ' ' + a.number + ',' + a.city}</p>
                        </button>
                    ))}
                </div>
                <button 
                    id="takeaway" 
                    onClick={() => setTakeAway(!takeAway)} 
                    className={takeAway ? 'active' : ''}
                >
                    <h1>TAKE AWAY?</h1>
                    <p>press if yes</p>
                </button>
                <button type="submit" onClick={() => { finish2Click(); }}><img src={delivery} className="myButton" width='50px' /></button>
            </div>
        </div>
    );
}

export default Finish2;
