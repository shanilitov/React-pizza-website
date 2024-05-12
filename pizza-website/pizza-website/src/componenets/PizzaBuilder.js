import React, { useState } from 'react';
import '../CSS/PizzaBuilder.css'; // קובץ CSS עם עיצוב

const PizzaBuilder = () => {
    const [toppings, setToppings] = useState([]);

    const handleToppingDrop = (e) => {
        e.preventDefault();
        const toppingId = e.dataTransfer.getData('text/plain');
        const toppingSrc = document.getElementById(toppingId).src;
        setToppings([...toppings, toppingSrc]);
    };

    const removeTopping = (index) => {
        const updatedToppings = [...toppings];
        updatedToppings.splice(index, 1);
        setToppings(updatedToppings);
    };

    return (
        <div className="pizza-builder">
            <div className="pizza-container" onDrop={handleToppingDrop} onDragOver={(e) => e.preventDefault()}>
                <div className="base-pizza">
                    <img src="basePizzaImage.jpg" alt="Base Pizza" />
                </div>
                {toppings.map((topping, index) => (
                    <div key={index} className="topping">
                        <img src={topping} alt={`Topping ${index + 1}`} onClick={() => removeTopping(index)} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PizzaBuilder;
