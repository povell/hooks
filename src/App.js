import { useState } from 'react';
import { useFetch } from './hooks/useFetch';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useHover } from './hooks/useHover';
import { useViewportSize } from './hooks/useViewportSize';
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
  const [token, { setItem, removeItem }] = useLocalStorage('token');

  const { hovered, ref } = useHover();

  const { height, width } = useViewportSize();

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
      <div>
      <p>
        Твой токен: { token }
      </p>
      <div>
        <button onClick={() => setItem('new-token')}>
          Задать токен
        </button>
        <button onClick={() => removeItem()}>
          Удалить токен
        </button>
      </div>
    </div>
    <div ref={ref}>
      {hovered ? 'На меня навели мышку' : 'Наведи мышкой на меня'}
    </div>
    <div>
      Width: {width}, height: {height}
    </div>
    </div>
  );
}

export default App;
