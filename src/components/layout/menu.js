import React, {Component} from 'react';

class Menu extends Component {
    render() {
        return (
            <nav id="navbar-site" className="fixed-top navbar navbar-dark bg-dark navbar-expand-sm">
                <div className="container">
                    <ul className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="/listStrategy">Estrategias</a></li>
                        <li className="nav-item"><a className="nav-link" href="/editStrategy">Cadastro</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Menu;