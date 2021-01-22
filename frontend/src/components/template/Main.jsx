/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import './Main.css';
import React from 'react';
import Header from './Header';

export default (props) => (
  <>
    <Header {...props} />
    <main className="content container-fluid">
      <div className="p-3 mt-3">
        {props.children}
      </div>
    </main>
  </>
);
