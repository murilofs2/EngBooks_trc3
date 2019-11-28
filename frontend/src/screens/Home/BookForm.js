import React, { Component } from "react";
import "../Login/App.css";

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

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titulo: null,
      autor: null,
      assunto: null,
      ano: null,
      idioma: null,
      quantidade: null,
      formErrors: {
        titulo: "",
        autor: "",
        assunto: "",
        ano: "",
        idioma: "",
        quantidade: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        titulo: ${this.state.titulo}
        autor: ${this.state.autor}
        assunto: ${this.state.assunto}
        ano: ${this.state.ano}
        idioma: ${this.state.idioma}
        quantidade: ${this.state.quantidade}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
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
      case "assunto":
        formErrors.assunto =
          value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "ano":
        formErrors.ano = value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      case "idioma":
        formErrors.idioma = value.length < 5 ? "minimum 5 characaters required" : "";
        break;
      case "quantidade":
        formErrors.quantidade = value.length < 1 ? "minimum 1 characaters required" : "";
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
          <h1>Cadastrar Livros</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="titulo">
              <label htmlFor="titulo">Titulo</label>
              <input
                className={formErrors.titulo.length > 0 ? "error" : null}
                placeholder="titulo"
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
                placeholder="autor"
                type="text"
                name="autor"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.autor.length > 0 && (
                <span className="errorMessage">{formErrors.autor}</span>
              )}
            </div>
            <div className="assunto">
              <label htmlFor="assunto">Assunto</label>
              <input
                className={formErrors.assunto.length > 0 ? "error" : null}
                placeholder="assunto"
                type="text"
                name="assunto"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.assunto.length > 0 && (
                <span className="errorMessage">{formErrors.assunto}</span>
              )}
            </div>
            <div className="ano">
              <label htmlFor="ano">Ano</label>
              <input
                className={formErrors.ano.length > 0 ? "error" : null}
                placeholder="ano"
                type="number"
                name="ano"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.ano.length > 0 && (
                <span className="errorMessage">{formErrors.ano}</span>
              )}
            </div>  
            <div className="idioma">
              <label htmlFor="idioma">Idioma</label>
              <input
                className={formErrors.idioma.length > 0 ? "error" : null}
                placeholder="idioma"
                type="text"
                name="idioma"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.idioma.length > 0 && (
                <span className="errorMessage">{formErrors.idioma}</span>
              )}
            </div>  
            <div className="quantidade">
              <label htmlFor="quantidade">Quantidade</label>
              <input
                className={formErrors.quantidade.length > 0 ? "error" : null}
                placeholder="quantidade"
                type="number"
                name="quantidade"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.quantidade.length > 0 && (
                <span className="errorMessage">{formErrors.quantidade}</span>
              )}      
            </div>
            <div className="AddBook">
              <button type="submit">Cadastrar Livros</button>
              
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Books;
