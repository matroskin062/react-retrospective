import './App.css';
import Column from './Column/Column';

const columns = [
  {
    id: 1,
    title: 'Good things',
    cards: [
      { text: 'a', id: 1, rating: 10, created_at: new Date().toLocaleString() },
    ],
  },
  { id: 2, title: 'Bad things', cards: [] },
  { id: 3, title: 'Action items', cards: [] },
];

function App() {
  return (
    <div className='Board'>
      {columns.map((column) => (
        <Column key={column.id} {...column} />
      ))}
    </div>
  );
}

export default App;
