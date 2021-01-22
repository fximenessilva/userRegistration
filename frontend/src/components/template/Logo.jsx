/* eslint-disable no-unused-vars */
import './Logo.css';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/polymer-black-48dp.svg';

export default (props) => (
  <aside className="logo">
    <Link to="/" className="logo">
      <img src={logo} alt="logo" />
    </Link>
  </aside>
);
