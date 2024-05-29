import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';

function ProductView() {

    const [name, setName] = useState('name')
    const [price, setPrice] = useState(0)
    const [enable, setEnable] = useState(false)
    const [state, setState] = useState([])

    const navigate = useNavigate()


    const params = useParams()

    

    useEffect(
        () => {
            if (params.data !== 'add') {
                //params= {data}/add 
                console.log(params)
                console.log(JSON.parse(params.data))

                let data = JSON.parse(params.data)
                setName(data.name)
                setPrice(data.price)
                setEnable(data.enable)
            }
        }, state)


    const enaleClick = () => {
        if (enable) {
            setEnable(false)
        }
        else {
            setEnable(true)
        }
    }
    const saveClick = () => {
        if (params.data === 'add') {
            console.log(name, price, enable)
            fetch(`http://localhost:3600/menue/addproduct/${name}/${price}/${enable}`)
                .then(navigate('/menu'))
        }
        else {
            let data = JSON.parse(params.data)
            let id = data.id
            console.log(id)

            fetch(`http://localhost:3600/menue/updateproduct/${id}/${name}/${price}/${enable}`)
            .then(navigate('/menu'))
        }

    }

    return (
        <div className="productView">
            <input type="input" placeholder={name} onChange={(event) => setName(event.target.value)} className="items" />
            <input type="input" placeholder={price} onChange={(event) => setPrice(event.target.value)} className="items" />
            <div className="items">
                <input type="checkbox" checked={enable} onChange={() => { enaleClick() }} className="items" />
                <label htmlFor="enable" className="items">ENABLE</label>
            </div>
            <button onClick={() => { saveClick() }} className="myButton items" >SAVE</button>
        </div>
    )
}
export default ProductView;