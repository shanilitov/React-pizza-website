import React, { useState } from 'react';

const ProductsComponent = ({ products }) => {

  const [displayAll, setDisplayAll] = useState(-1)
  const [chosen, setChosen] = useState()

  const selectionChanged = (id)=>{
    setDisplayAll(displayAll * -1)
    setChosen(id)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      {products.map((product, index) => (
        <div key={index} onClick={()=> selectionChanged(index)} style={{ backgroundColor: product.ready === 0 ? '#8a2a216e' : '#0d090933', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          <h1>{product.product_name}</h1>
          {displayAll !== -1 && index === chosen && (
            <div>
              <h3>{product.ready === 0 ? 'On proccess' : 'DONE'}</h3>
              <h3>{product.price}$</h3>
              <h3>amount: {product.amount}</h3>
            </div>
          )}


        </div>
      ))}
    </div>
  );
};

export default ProductsComponent;
