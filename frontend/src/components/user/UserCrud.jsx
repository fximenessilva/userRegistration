/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import axios from 'axios';
import Main from '../template/Main';

const headerProps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!',
};

const baseUrl = 'http://localhost:3055/users';

const initialState = {
  user: { name: '', email: '' },
  list: [],
};

export default class UserCrud extends Component {

  state = {...initialState}

  getUpdatedList(user) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    list.unshift(user);
    return list;
  }

  save() {
    const { user } = this.state;
    const method = user.id ? 'put' : 'post';
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user)
      .then((resp) => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ user: initialState.user, list });
      });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name]
  }

  render() {
    return (
      <Main {...headerProps}>
        Cadastro de Usuário
      </Main>
    );
  }
}
