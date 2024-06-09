import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import back from '../img/back.png';
import pay from '../img/pay.png';

function Finish1() {
    const [shoppinglist, setshoppinglist] = useState([]);
    const [final, setfinal] = useState(0);
    const [comment, setcomment] = useState("");
    const [addings, setaddings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load shopping list
        let getlist = localStorage.getItem('shopping_cart');
        if (getlist) {
            getlist = JSON.parse(getlist);
            setshoppinglist(getlist);
            let sum = 0;
            getlist.forEach((data) => {
                sum += data.product.price * data.quantity;
            });
            setfinal(sum);
            localStorage.setItem('price', JSON.stringify(sum));
        }

        // Load comment
        let getComment = localStorage.getItem('comment');
        if (getComment) {
            setcomment(getComment);
        }

        // Load addings
        let getAddings = localStorage.getItem('addings');
        if (getAddings) {
            try {
                // Try to parse as JSON
                const parsedAddings = JSON.parse(getAddings);
                if (Array.isArray(parsedAddings)) {
                    setaddings(parsedAddings);
                } else {
                    // If not an array, assume it's a comma-separated string
                    setaddings(getAddings.split(',').map(item => item.trim()));
                }
            } catch (error) {
                // If error in parsing, assume it's a comma-separated string
                setaddings(getAddings.split(',').map(item => item.trim()));
            }
        }
    }, []);

    function saveCommit() {
        localStorage.setItem('comment', comment);
    }

    return (
        <div className="finish1">
            <div className="listf1" style={{ backgroundColor: 'black' }}>
                <h1 style={{
                    backgroundColor: 'red',
                    color: 'black'
                }}>YOUR ORDER</h1>
                {shoppinglist.map((a, i) => (
                    <div className="finish1p" key={i}>
                        <h1 className="h1f1">{a.product.name}</h1>
                        <p>{`Quantity: ${a.quantity}`}</p>
                        {a.product.id === 1 && a.product.name === 'pizza' && addings.length > 0 && (
                            <p>{`Addings: ${addings.join(', ')}`}</p>
                        )}
                    </div>
                ))}
            </div>
            <div>
                <Link to='/'><img src={back} className="myButton" width='50px' /></Link>
                <div style={{ backgroundColor: 'black' }}>
                    <textarea style={{ height: '100px' }} onChange={(event) => { setcomment(event.target.value) }} onBlur={saveCommit} placeholder="Leave your commits here..." value={comment}></textarea>
                    <h1 style={{ color: 'red' }}>{final + '$'}</h1>
                    <Link to='/pay'><img src={pay} className='myButton' width='50px' /></Link>
                </div>
            </div>
        </div>
    );
}

export default Finish1;
