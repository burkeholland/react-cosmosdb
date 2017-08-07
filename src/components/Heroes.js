import React, { Component } from "react";

import EditHero from "./EditHero";
import heroService from "../services/hero-service";

class Heroes extends Component {
  constructor() {
    super();

    this.state = {
      heroes: [],
      creatingHero: false
    };

    this.handleEnableAddMode = this.handleEnableAddMode.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    heroService.get().then(json => this.setState({ heroes: json }));
  }

  handleSelect(hero) {
    this.setState({ selectedHero: hero });
  }

  handleDelete(event, hero) {
    event.stopPropagation();

    heroService.destroy(hero).then(() => {
      let heroes = this.state.heroes;
      heroes = heroes.filter(h => h !== hero);
      this.setState({ heroes: heroes });

      if (this.selectedHero === hero) {
        this.setState({ selectedHero: null });
      }
    });
  }

  handleEnableAddMode() {
    this.setState({
      addingHero: true,
      selectedHero: { id: "", name: "", saying: "" }
    });
  }

  handleCancel() {
    this.setState({ addingHero: false, selectedHero: null });
  }

  handleSave() {
    let heroes = this.state.heroes;

    if (this.state.addingHero) {
      heroService
        .create(this.state.selectedHero)
        .then(result => {
          console.log("Successfully created!");

          heroes.push(this.state.selectedHero);
          this.setState({
            heroes: heroes,
            selectedHero: null,
            addingHero: false
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      heroService.update(this.state.selectedHero).catch(err => {
        console.log("Updated!");
      });
    }
  }

  handleOnChange(event) {
    let selectedHero = this.state.selectedHero;
    selectedHero[event.target.name] = event.target.value;
    this.setState({ selectedHero: selectedHero });
  }

  render() {
    return (
      <div>
        <ul className="heroes">
          {this.state.heroes.map(hero => {
            return (
              <li
                key={hero.id}
                onClick={() => this.handleSelect(hero)}
                className={hero === this.state.selectedHero ? "selected" : ""}
              >
                <button
                  className="delete-button"
                  onClick={e => this.handleDelete(e, hero)}
                >
                  Delete
                </button>
                <div className="hero-element">
                  <div className="badge">
                    {hero.id}
                  </div>
                  <div className="name">
                    {hero.name}
                  </div>
                  <div className="saying">
                    {hero.saying}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="editarea">
          <button onClick={this.handleEnableAddMode}>Add New Hero</button>
          <EditHero
            addingHero={this.state.addingHero}
            onChange={this.handleOnChange}
            selectedHero={this.state.selectedHero}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          />
        </div>
      </div>
    );
  }
}

export default Heroes;
