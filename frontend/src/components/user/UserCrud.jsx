/* eslint-disable consistent-return */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
/* eslint-disable react/no-deprecated */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';
import './UserCrud.css';

import Modal from './Modal';
import ModalDelete from './ModalDelete';

const headerProps = {
  icon: 'users',
  title: 'Users',
  subtitle: 'User registration: Create, Read, Update and Delete!',
};

const baseUrl = 'http://localhost:3055/users';

const initialState = {
  user: { name: '', email: '' },
  list: [],
};

export default class UserCrud extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);

    return list;
  }

  save() {
    const { user } = this.state;
    const { email } = user;
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user)
      .then((resp) => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ user: initialState.user, list });
      });
    if (!this.state.list.map((e) => e.email).includes(email)) {
      return 1;
    }
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                name="name"
                value={this.state.user.name}
                onChange={(e) => this.updateField(e)}
                placeholder="Type your name..."
                required
              />

            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="text"
                id="email"
                className="form-control"
                name="email"
                value={this.state.user.email}
                onChange={(e) => this.updateField(e)}
                placeholder="Type your email..."
              />
            </div>
            {/* {this.state.list.map((e) => e.email).includes(this.state.user.email)
              ? <p id="already-rgtrd">You are already registered</p> : ''} */}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#exampleModal"
              disabled={!this.state.user.name.length || !this.state.user.email.length}

            >
              Save
            </button>
            <Modal
              title="Submit"
              subtitle="Save changes?"
              btnTitle="Save changes"
              onClickAction={(e) => this.save(e)}
            />
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancel
            </button>

          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
        </tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td className="btn-wrapper">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => this.load(user)}
          >
            <i className="fa fa-pencil" />
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            <i className="fa fa-trash" />

          </button>
          <ModalDelete
            title="Delete"
            subtitle="Delete user?"
            btnTitle="Delete"
            onClickAction={() => this.remove(user)}
          />
        </td>
      </tr>
    ));
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
