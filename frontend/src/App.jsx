import { useState , useEffect } from "react";
import api from './api';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', price: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) return;
    
    try {
      await api.post('/products', form);
      setForm({ name: '', quantity: '', price: '' });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

return (
  <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Inventory Management System</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px', padding: '20px', background: '#e9ecef', borderRadius: '8px' }}>
        <input 
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          placeholder="Product Name" 
          value={form.name} 
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required 
        />
        <input 
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          type="number" 
          placeholder="Quantity" 
          value={form.quantity} 
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required 
        />
        <input 
          style={{ flex: 1, padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          type="number" 
          step="0.01"
          placeholder="Price ($)" 
          value={form.price} 
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required 
        />
        <button style={{ padding: '8px 16px', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }} type="submit">
          Save Product
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'white' }}>
        <thead>
          <tr style={{ background: '#212529', color: 'white' }}>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Qty</th>
            <th style={{ padding: '12px' }}>Price</th>
            <th style={{ padding: '12px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr><td colSpan="4" style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6' }}>No products available.</td></tr>
          ) : (
            products.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.name}</td>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{p.quantity}</td>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>${parseFloat(p.price).toFixed(2)}</td>
                <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                  <button 
                    onClick={() => handleDelete(p.id)}
                    style={{ padding: '6px 12px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


export default App;















