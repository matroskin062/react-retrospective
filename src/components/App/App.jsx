import Column from '../Column/Column';
import { columns } from '../../data.js';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.Board}>
      {columns.map((column) => (
        <Column key={column.id} {...column} />
      ))}
    </div>
  );
}

export default App;
