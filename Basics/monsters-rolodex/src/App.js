import React, { Component } from 'react';
import { CardList } from "./components/card-list/card-list.component";
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: []
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }) );
  }

  render() {
    return (
      <div className="App">
       <CardList name="Hola">
        {
          this.state.monsters.map(monsters => (
          <h1 key={monsters.id}>{monsters.name}</h1>
          ))
        }
       </CardList> 
      </div>
    );
  }
}

export default App;
