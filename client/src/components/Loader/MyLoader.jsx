import React from 'react';
import styles from './MyLoader.module.css';
import { Spinner } from 'react-bootstrap';

const MyLoader = () => {
  return (
    <div style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default MyLoader;
