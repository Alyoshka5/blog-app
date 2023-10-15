import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  async function getData() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    } 
    const response = await fetch('/blog/posts');
    const data = await response.json()
    setData(data);
    console.log(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      {data ? data['hi'] : 'loading'}
    </div>
  );
}

export default App;
