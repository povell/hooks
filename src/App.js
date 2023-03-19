import { useState } from 'react';
// import { useToggle } from './hooks/useToggle';
// import { useTimeout } from './hooks/useTimeout';
// import { useDebounce } from './hooks/useDebounce';
import { useFetch } from './hooks/useFetch';
import './App.css';
import { useUpdateEffect } from './hooks/useUpdateEffect';

function App() {
  const [count, setCount] = useState(10);
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useFetch('https://jsonplaceholder.typicode.com/posts');

  useUpdateEffect(() => {
    alert(count);
  }, [count]);

  return (
    <div className="App">
      <p>
        {count}
      </p>
      <button onClick={() => setCount(c => c + 1)}>increment</button>
      <div>
        <div>
          <button onClick={() => refetch({
            params: {
              _limit: 3
            }
          })}>
            Перезапросить
          </button>
        </div>
        {isLoading && 'Загрузка...'}
        {error && 'Произошла ошибка'}
        {data && !isLoading && data.map(item => <div key={item.id}>{item.title}</div>) }
      </div>
    </div>
  );
}

export default App;
