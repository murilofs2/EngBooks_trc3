import React, { Component } from 'react';
import logo from '../../assets/engbooks.png';
import { Link } from 'react-router-dom';
import { Button, Logo, Navbar, Ul, GlobalStyle } from './styles.js';

class Header extends Component{
    render() {
        return(
            <div>
                <GlobalStyle />
                <Navbar>
                        <Link to={"/"}>
                            <Logo>
                               <img src={ logo } alt="logologo"/>
                            </Logo>
                        </Link>
                        <Ul>
                            <Link to={"/login"}>
                                <Button>Entrar</Button>
                            </Link>
                            <Link to={"/signup"}>
                                <Button>Inscreva-se</Button>
                            </Link>
                            <Link to={"/addBook"}>
                                <Button>Adicionar Livro</Button>
                            </Link>
                        </Ul>
                </Navbar>
            </div>
        )
    }
}

export default Header;