import React, { Component } from 'react';
import { Container } from './styles';
import BookForm from "./BookForm";

class HomeScreen extends Component {
    render() {
        return(
            <div>
    <h2>Pesquisar aqui</h2>
    <div class="search-screen">
      <div class="search-box" >
        <input type= "text" class=" search-txt" placeholder ="search" />
        <button class="search-btn">
        </button>  
        <div className="main-bookform-container">
          <BookForm />
        </div>
      </div>
    </div>
  </div>
        )
    }
}

export default HomeScreen;