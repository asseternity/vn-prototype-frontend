import { useEffect, useState } from 'react';

type TestResponse = {
  message: string;
};

function App() {
  const [data, setData] = useState<TestResponse | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const res = await fetch('http://localhost:3000/test');
        if (!res.ok) throw new Error('backend refuses to cooperate');
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error('fetch is having a meltdown:', err);
      }
    };

    fetchTest();
  }, []);

  return (
    <div>
      <h1>Backend says: {data?.message || 'nothing yet'}</h1>
    </div>
  );
}

export default App;
