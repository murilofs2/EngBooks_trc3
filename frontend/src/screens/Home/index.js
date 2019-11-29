import React, { Component } from 'react';
import BookForm from "./BookForm";

class HomeScreen extends Component {
    render() {
        return(
          <div >
            <div class="search-container">
            <h1>Pesquisar</h1>
              <div class="search-screen">
                <div class="search-box" >
                  <input type= "text" class=" search-txt" placeholder ="Pesquisar Titulo, Autor" />
                  <button class="search-btn">Pesquisar</button>  
                </div>
              </div>
            </div>  
            
          </div>
        )
    }
}

export default HomeScreen;