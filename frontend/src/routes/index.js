import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login'
import SignupScreen from '../screens/Signup'
import Header from '../components/Header';
import CadastrarLivro from '../screens/AddBook.js'
import AtualizarScreen from '../screens/Atualizar'
import DeletarScreen from '../screens/Deletar'


const AppRouter = () => (
    <Router>
        <div>
            <Header />
            <Switch>
                <Route path="/" exact component={ HomeScreen } />
                <Route path="/login" component={ LoginScreen } />
                <Route path="/signup" component={ SignupScreen } />
                <Route path="/addBook" component={ CadastrarLivro } />
                <Route path="/atualizar" component={ AtualizarScreen } />
                <Route path="/deletar" component={ DeletarScreen } />
            </Switch>
        </div>
    </Router>
)

export default AppRouter;