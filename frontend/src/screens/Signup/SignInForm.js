import React, { Component } from "react";
import "../Login/App.css";
import axios from 'axios';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      email: null,
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
      }
    };
  }

  POST_request() {
    axios.post('https://engbooks.herokuapp.com/cadastro', {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(response => {
      this.setState({ message: response.data.message });
      console.log(this.state.message);
    }).catch(error => {
      console.log(error);
    })
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      this.POST_request();
    } else {
      console.error("Formulário Inválido.");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
        case "username":
        formErrors.username =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Criar Conta</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            {/* <div className="firstName">
              <label htmlFor="firstName">Nome</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="Nome"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Sobrenome</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Sobrenome"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div> */}
            <div className="username">
              <label htmlFor="username">Nome do usuário</label>
              <input
                className={formErrors.username.length > 0 ? "error" : null}
                placeholder="Nome do usuário"
                type="text"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.username.length > 0 && (
                <span className="errorMessage">{formErrors.username}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Senha</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Senha"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Criar conta</button>
              <small>{this.state.message}</small>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignIn;
