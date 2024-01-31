import Image from 'next/image'
import styles from '../styles/todo.module.css'
import { useState } from 'react'

export default function ToDo(props) {
  const { todo, onChange, onDelete } = props;
  const [poem, setPoem] = useState(null); // Add this line to define the poem state
  const [isPoemVisible, setIsPoemVisible] = useState(false); // Track the visibility of the poem box

  // The following function is added for our LangChain test:
  async function generatePoem(id) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/write-poem/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
    if (res.ok) {
        const data = await res.json();
        setPoem(data.poem);
        setIsPoemVisible(true); // Show the poem box when a poem is generated
    }
  }

  // Function to close the poem box
  function closePoemBox() {
    setIsPoemVisible(false);
  }

  return (
    <div className={styles.toDoRow} key={todo.id}>
      <input
        className={styles.toDoCheckbox}
        name="completed"
        type="checkbox"
        checked={todo.completed}
        value={todo.completed}
        onChange={(e) => onChange(e, todo.id)}
      ></input>
      <input
        className={styles.todoInput}
        autoComplete='off'
        name="name"
        type="text"
        value={todo.name}
        onChange={(e) => onChange(e, todo.id)}
      ></input>
      <button
        className={styles.generatePoemBtn} // Style the poem button as needed
        onClick={() => generatePoem(todo.id)} // Call the generatePoem function
      >
        Generate Poem
      </button>
      <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)}>
        <Image src="/delete-outline.svg" width="24" height="24" />
      </button>
      {isPoemVisible && (
        <div className={styles.poemBox}>
          <button className={styles.closeButton} onClick={closePoemBox}>
            &times; {/* Add a close icon (×) */}
          </button>
          <div className={styles.poem}>
            <p>{poem}</p>
          </div>
        </div>
      )}
    </div>
  );  

}