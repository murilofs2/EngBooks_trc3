import styled, { createGlobalStyle } from 'styled-components';

/*
verde: #1AE26A
branco: #EEE
azul: #494cc1
texto: #0E0139
*/

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background: #EEE

    }
`;


export const Navbar = styled.div`
    padding: 20px;
    overflow: hidden;
    position: relative;    
    align-items: center;
`;



export const Logo = styled.div`
    width: 50%;
    float: left;
    align-items: center;

    img {
        width: 220px;
        padding-left: 100px;
    }
`;


export const Ul = styled.ul`
    display: inline-block;
    float: right;
`;

export const Button = styled.button`
    font-family: 'sans-serif';
    font-weight: bold;
    color: #EEE;
    border: 0;
    text-align: center;
    margin: 20px;
    margin-left: 50px;
    font-size: 15px;
    padding: 14px 10px;
    width: 220px;
    border-radius: 24px;
    background: #0E0139; 
    transition: 0.25s;
    &:hover {
        width: 250px;
    }
`;