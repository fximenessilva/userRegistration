/* eslint-disable no-unused-vars */
import './Logo.css';
import React from 'react';
import logo from '../../assets/img/polymer-black-48dp.svg';

export default (props) => (
  <aside className="logo">
    <a href="/" className="logo">
      <img src={logo} alt="logo" />
    </a>
  </aside>
);
