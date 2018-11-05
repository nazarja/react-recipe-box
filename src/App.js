import React, { Component } from 'react';

import Header from './components/Header.js';
import DefaultRecipes from './DefaultRecipes.js';
import RecipeIndex from './components/RecipeIndex.js';
import Footer from './components/Footer.js';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: ""
        };

    }

    componentDidMount() {
        if ("recipes" in localStorage) {
            let recipes = localStorage.getItem("recipes");
            recipes = JSON.parse(recipes)

            this.setState({
                recipes: recipes
            }, function () { console.log("Already Running")});
        }
        else {
            localStorage.setItem("recipes", JSON.stringify(DefaultRecipes));
            let recipes = localStorage.getItem("recipes");
            recipes = JSON.parse(recipes)

            this.setState({
                recipes: recipes
            }, function () { console.log("First Run") });
        }
    }

    render() {
        
        return (
            <div className="App">
                <Header  />
                <RecipeIndex recipes={this.state.recipes}/>
                <Footer />
            </div>
        );
    }
}

export default App;
