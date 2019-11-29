import React, { Component } from "react";
import "../Login/App.css";
import axios from 'axios';

/*
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
*/
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

class BooksDel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titulo: null,
      autor: null,
      formErrors: {
        titulo: "",
        autor: "",
      },
      message: []
    };
  }

  POST_request() {
    axios.post('https://engbooks.herokuapp.com/livros', {
      titulo: this.state.titulo,
      autor: this.state.autor,
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
      case "titulo":
        formErrors.titulo = value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "autor":
          formErrors.autor = value.length < 5 ? "minimum 5 characaters required" : "";
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper-book">
        <div className="form-wrapper">
          <h1>Deletar Livros</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="titulo">
              <label htmlFor="titulo">Titulo</label>
              <input
                className={formErrors.titulo.length > 0 ? "error" : null}
                placeholder="Titulo"
                type="text"
                name="titulo"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.titulo.length > 0 && (
                <span className="errorMessage">{formErrors.titulo}</span>
              )}
            </div>
            <div className="autor">
              <label htmlFor="autor">Autor</label>
              <input
                className={formErrors.autor.length > 0 ? "error" : null}
                placeholder="Autor"
                type="text"
                name="autor"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.autor.length > 0 && (
                <span className="errorMessage">{formErrors.autor}</span>
              )}
            </div>
            <div className="DelBook">
              <button type="submit">Deletar Livros</button>
              
            </div>
          </form>
          <div style={{"textAlign": "center"}}>Mensagem recebida: {this.state.message}</div>
        </div>
      </div>
    );
  }
}

export default BooksDel;
