

const NameListDemo = () => {
  const categories = ['JavaScript', 'Programming Language', 'DevOps'];

  return (
    <div>
      <h2>🔹 Rendering using map with key</h2>
      {
        categories.map((cat, index) => (
          <h3 key={index}>{index + 1}. {cat}</h3>
        ))
      }

      <h2>🔹 Rendering as unordered list</h2>
      <ul>
        {
          categories.map((cat, index) => (
            <li key={index}>{cat}</li>
          ))
        }
      </ul>

      <h2>🔹 Rendering with styling (cards)</h2>
      <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
        {
          categories.map((cat, index) => (
            <div key={index} style={{
              padding: '10px',
              backgroundColor: '#f9f9f9',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
            }}>
              {cat}
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default NameListDemo;
