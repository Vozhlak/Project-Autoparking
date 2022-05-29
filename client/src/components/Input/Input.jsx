import React from 'react';
import styles from './Input.module.scss';

const Input = (props) => {
  return (
    <>  
      <input className={styles.myInput}
        onChange={(event) => props.setValue(event.target.value)}
        value={props.value}
        type={props.type}
        placeholder={props.placeholder}
      />
    </>
  )
}

export { Input }
