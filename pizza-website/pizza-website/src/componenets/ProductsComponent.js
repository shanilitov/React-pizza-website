import React from 'react';

const ProductsComponent = ({ products }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
      {products.map((product, index) => (
        <div key={index} style={{ backgroundColor: product.status === 'ready' ? '#d4edda' : '#fff3cd', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
          {product.name} - {product.status}
        </div>
      ))}
    </div>
  );
};

export default ProductsComponent;
