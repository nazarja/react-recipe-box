import React, { Component } from 'react';

import EditRecipe from './EditRecipe.js'

class RecipeIndex extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: this.props.recipes,
            editRecipe: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.state.recipes) {
            this.setState({
                recipes: nextProps.recipes
            })  
        }
    }

    expand = (event) => {
        let target = event.target;
        if (target.className === "rH4") {
            target = target.parentElement;
        }

        if (target.style.height !== "auto") {
            target.style.height = "auto";
        }
        else {
            target.style.height = "50px";
        }
    }

    renderRecipes = (key) => {
        const recipe = this.state.recipes[key];
        return (
            <div key={key} className="recipeDiv">
                <h3 className="rName">{recipe.name}</h3>
                <img className="rImage" src={recipe.image} alt={recipe.name}></img>
                <p className="rDescription">{recipe.description}</p>
                <div className="hide expand" onClick={this.expand}>
                <h4 className="rH4">Ingredients:<i className="fa fa-arrow-down"></i></h4>
                    <p className="rIngredients"> 
                    {
                        recipe.ingredients.map((ingredient, i) => {
                            return <span key={i}>{ingredient}<br/></span>;
                        })
                    }
                </p>
                </div>
                <div className="hide expand" onClick={this.expand}> 
                    <h4 className="rH4">Cooking Instructions:<i className="fa fa-arrow-down"></i></h4>
                    <p className="rInstructions ">
                        {
                            recipe.instructions.map((instruction, i) => {
                                return <span key={i}>{instruction}<br /><br /></span>;
                            })
                        }
                    </p>
                </div>
                <p className="rServe"><strong>People to Serve:</strong> {recipe.serves}</p>
                <p className="rTime"><strong>Time to Cook:</strong> {recipe.time}</p>
                <p className="rDrink"><strong>Drink:</strong> {recipe.drink}</p>
                <div className="rEditDeleteDiv">
                    <button className="btn btn-rEditRecipe" onClick={this.editRecipe} data-key={key}>Edit Recipe</button>
                        <button className="btn btn-rDeleteRecipe" onClick={this.deleteRecipe} data-key={key}>Delete Recipe</button>
                </div>
            </div>
        )
    }

    editRecipe = (event) => {
        const key = event.target.dataset.key;
        let recipes = localStorage.getItem("recipes");
        recipes = JSON.parse(recipes);
        let recipe = recipes[key];
        this.setState({
            editRecipe: [key, recipe]
        })
    }

    deleteRecipe = (event) => {
        const key = event.target.dataset.key;
        let recipes = localStorage.getItem("recipes");
        recipes = JSON.parse(recipes);
        delete recipes[key];
        localStorage.setItem("recipes",  JSON.stringify(recipes));
        this.setState({
            recipes: recipes,
            editRecipe: false
        })
    }

    updateStateFromChild = () => {
        let recipes = localStorage.getItem("recipes");
        recipes = JSON.parse(recipes);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        this.setState({
            recipes: recipes,
            editRecipe: false
        })
    }

    render() {

        return (
            <div className="recipesDiv">
                {Object.keys(this.state.recipes).map(this.renderRecipes)}
                <EditRecipe editRecipe={this.state.editRecipe} returnState={this.updateStateFromChild}/>
            </div>
        );
    }
}

export default RecipeIndex;