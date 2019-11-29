import React, { Component } from 'react';
import axios from 'axios';
import BookDefault from "../../assets/livros.png";

class HomeScreen extends Component {
  
  constructor (props) {
    super(props);

    this.state = {
      pesquisaFlag: false,
      pesquisaValor: null,
      livros: []
    }
  }

  GET_request() {
    if (this.state.pesquisaValor == "") this.setState({ pesquisaValor: null });

    axios.get('https://engbooks.herokuapp.com/livros', {
      params: {
        titulo: this.state.pesquisaValor,
        autor: this.state.pesquisaValor
      }
    }).then(response => {
      this.setState({ livros: response.data, pesquisaFlag: false });
    }).catch(error => {
      console.log(error);
      this.setState({ pesquisaFlag: false });
    })
  }

  render() {
        return(
          <div >
            <div class="search-container">
            <h1>Pesquisar</h1>
              <div class="search-screen">
                <div class="search-box" >
                  <input type= "text" class=" search-txt" placeholder ="Pesquisar Titulo, Autor" onChange={e => this.setState({ pesquisaValor: e.target.value })}/>
                  <button class="search-btn" onClick={() => this.setState({ pesquisaFlag: true })}>Pesquisar</button>  
                  {this.state.pesquisaFlag && this.GET_request()}
                  <div style={{"display": "flex", "flexDirection": "row", "marginTop":"50px"}}>
                    {!this.state.pesquisaFlag && this.state.livros.map((livro) => {
                      return (
                        <div style={{"textAlign":"center","marginLeft": "15px","backgroundColor": "white", "width": '300px', "height": '500px'}}>
                          <img src={BookDefault} style={{"width":"200px", "height":"200px"}}/>
                          <h1>{livro.titulo}</h1>
                          <h1>Autor: {livro.autor}</h1>
                          <h2>Assunto: {livro.assunto}</h2>
                          <h2>Ano: {livro.ano}</h2>
                          <h2>Quantidade: {livro.quantidade}</h2>
                        </div>
                      )
                    })}
                    </div>                
                </div> 
              </div>
            </div>    
          </div>
        )
    }
}

export default HomeScreen;