import React, { Component } from 'react';

class EditRecipe extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            url: "",
            description: "",
            serves: "",
            time: "",
            drink: "",
            ingredients: [],
            instructions: [],
            dataSet: "",
            key: "",
            editKey: "",
            editRecipe: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editRecipe === false) {
            return;
        }
        else {
            let editKey = nextProps.editRecipe[0];
            let editRecipe = nextProps.editRecipe[1];
            this.setState({
                editKey: editKey,
                editRecipe: editRecipe
            }, function () { 
                const editRecipe = document.getElementById("editRecipe");
                let opacity = 0;
                editRecipe.style.display = "block";

                setInterval(function () {
                    if (opacity <= 1) {
                        opacity = opacity + .01;
                        editRecipe.style.opacity = opacity;
                    }
                    else {
                        clearInterval();
                    }
                }, 5);
                let recipe = this.state.editRecipe;
                document.getElementById("addTitle").value = recipe.name;
                document.getElementById("addUrl").value = recipe.image;
                document.getElementById("addDescription").value = recipe.description;
                document.getElementById("addServes").value = recipe.serves;
                document.getElementById("addTime").value = recipe.time;
                document.getElementById("addDrink").value = recipe.drink;
                this.setState({
                    ingredients: recipe.ingredients,
                    instructions: recipe.instructions
                })
            })
        }
    }

    saveDetails = () => {

        let recipes = localStorage.getItem("recipes");
        recipes = JSON.parse(recipes);

        const newRecipe = {
            name: document.getElementById("addTitle").value,
            image: document.getElementById("addUrl").value,
            description: document.getElementById("addDescription").value,
            ingredients: this.state.ingredients,
            instructions: this.state.instructions,
            serves: document.getElementById("addServes").value,
            time: document.getElementById("addTime").value,
            drink: document.getElementById("addDrink").value
        }

        if (this.state.editKey !== "") {
            const key = this.state.editKey;
            recipes[key] = newRecipe;
        }
        else {
            const num = Object.keys(recipes);
            const key = `r${num}`;
            recipes[key] = newRecipe;
        } 

        localStorage.setItem("recipes", JSON.stringify(recipes));
        this.closeEditRecipe();
        this.props.returnState();
    }

    clearAll = () => {
        this.setState({
            title: "",
            url: "",
            description: "",
            serves: "",
            time: "",
            drink: "",
            ingredients: [],
            instructions: [],
            dataSet: "",
            key: "",
            editKey: "",
            editRecipe: ""
        })

        const inputs = document.querySelectorAll("input");
        const textarea = document.getElementById("addDescription");
        for ( let i of inputs) {
            i.value = "";
        }
        textarea.value = "";
    }

    closeEditRecipe = () => {
        const editRecipe = document.getElementById("editRecipe");
        editRecipe.style.display = "none";
        editRecipe.style.opacity = 0;
        this.clearAll();
    }

    addIngredients = () => {
        const addIngredient = document.getElementById("addIngredients");
        let ingredient = addIngredient.value;

        if (ingredient === "") return;
        
        let join = this.state.ingredients.concat(ingredient)
        this.setState({ ingredients: join }, function () {
            addIngredient.value = "";
        });

    }

    addInstructions = () => {
        const addInstruction = document.getElementById("addInstructions");
        let instruction = addInstruction.value;

        if (instruction === "") return;
        
        let join = this.state.instructions.concat(instruction)
        this.setState({ instructions: join }, function () {
            addInstruction.value = "";
        });
    }

    editItem = (event) => {
        const editListItemDiv = document.getElementById("editListItemDiv");
        const textarea = document.getElementById("editTextArea");
        const key = event.target.parentElement.dataset.key;
        const parent = event.target.parentElement.className;
        editListItemDiv.style.display = "block";
        this.setState({
            dataSet: parent,
            key: key
        })

        if (parent === "addedIngredients") {
            let newIngredients = this.state.ingredients;
            let input =  newIngredients[key];
            textarea.value = input;
        }
        else {
            let newInstructions = this.state.instructions;
            let input = newInstructions[key];
            textarea.value = input;
        }
    }

    removeItem = (event) => {
        const key = event.target.parentElement.dataset.key;
        const parent = event.target.parentElement.className;
        
        if (parent === "addedIngredients") {
            let newIngredients = this.state.ingredients;
            newIngredients.splice(key, 1);
            this.setState({
                ingredients: newIngredients
            })
        }
        else {
            let newInstructions = this.state.instructions;
            newInstructions.splice(key, 1);
            this.setState({
                instructions: newInstructions
            })
        }
    }

    saveItem = () => {
        const name =  this.state.dataSet;
        const key = this.state.key;
        const textarea = document.getElementById("editTextArea");
        const value = textarea.value;

        if (name === "addedIngredients") {
            let newIngredients = this.state.ingredients;
            newIngredients.splice(key, 1, value);
            this.setState({
                ingredients: newIngredients
            })
        }
        else {
            let newInstructions = this.state.instructions;
            newInstructions.splice(key, 1, value);
            this.setState({
                instructions: newInstructions
            })
        }
        const editListItemDiv = document.getElementById("editListItemDiv");
        editListItemDiv.style.display = "none";
    }

    cancelItem = () => {
        const editListItemDiv = document.getElementById("editListItemDiv");
        editListItemDiv.style.display = "none";
    }


    render() {
        return (
            <div className="editRecipe" id="editRecipe">
                    <h1 className="editRecipeTitle">Add/Edit your Recipe!</h1>
                    <div className="edit-btn-div">
                        <button className="btn btn-recipe-div btn-recipe-div-save" onClick={this.saveDetails}>Save Recipe</button>
                        <button className="btn btn-recipe-div btn-recipe-div-clear" onClick={this.clearAll}>Clear All</button>
                        <button className="btn btn-recipe-div btn-recipe-div-close" onClick={this.closeEditRecipe}>Close Window</button>
                    </div>
                <div className="details editRecipeDiv">
                    <h3>Details:</h3>
                    <p>Title:</p>
                    <input id="addTitle" placeholder="Add/Edit - Recipe Title"></input>
                    <p>Image url:</p>
                    <input id="addUrl" placeholder="Add/Edit - Image URL"></input>
                    <p>Description:</p>
                    <textarea id="addDescription" placeholder="Add/Edit - Recipe Description"></textarea>
                    <p>Serves:</p>
                    <input id="addServes" placeholder="Add/Edit  - Serves"></input>
                    <p>Cooking Time:</p>
                    <input id="addTime" placeholder="Add/Edit  - Time to Cook"></input>
                    <p>Drink:</p>
                    <input id="addDrink" placeholder="Add/Edit - Drink"></input>
                </div>
                <div className="ingredients editRecipeDiv">
                    <h3>Ingredients:</h3>
                    <input placeholder="Add/Edit Ingredients" id="addIngredients"></input><i className="fa fa-plus recipe-plus" title="Add Ingredient" onClick={this.addIngredients} id="clickIngredient"></i>
                    <div>
                        {this.state.ingredients.map((ingredient, i) => 
                            {
                            return (
                                <div className="addedIngredients" key={i} data-key={i}>
                                    <p className="listItem">{ingredient}</p>
                                    <i className="fa fa-pencil" title="Edit" onClick={this.editItem}></i>
                                    <i className="fa fa-trash" title="Delete" onClick={this.removeItem}></i>
                                </div>);
                            })
                         }
                    </div>
                </div>
                <div className="instructions editRecipeDiv">
                    <h3>Instructions:</h3>
                    <input placeholder="Add/Edit Instructions" id="addInstructions"></input><i className="fa fa-plus recipe-plus" title="Add Instruction" onClick={this.addInstructions} id="clickInstructions"></i>
                    <div className="addedInstructions">
                        <div>
                            {this.state.instructions.map((instructions, i) => {
                                return ( 
                                    <div className="addedInstructions" key={i} data-key={i}>
                                        <p className="listItem">{instructions}</p>
                                        <i className="fa fa-pencil" title="Edit" onClick={this.editItem}></i>
                                        <i className="fa fa-trash" title="Delete" onClick={this.removeItem}></i>
                                    </div>);
                                })
                            }
                        </div>
                    </div>
                </div>
                <div id="editListItemDiv">
                        <div className="editListItem">
                            <h3 className="editItemH3">Edit Item</h3>
                            <textarea id="editTextArea"></textarea>
                            <div className="editListItemBtns">
                                <button className="btn btn-listItem btn-listItem-save" id="saveListItem" onClick={this.saveItem}>Save</button>
                            <button className="btn btn-listItem btn-listItem-cancel" id="editListItem" onClick={this.cancelItem}>Cancel</button>
                            </div>
                        </div>
                </div>
            </div>
        );
    }
}

export default EditRecipe;