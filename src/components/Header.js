import React, { Component } from 'react';

class Header extends Component  {

    editRecipe = () => {
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
    };

    render() {
        return (
            <div className="header">
                <div className="menu">
                    <h1><i className="fa fa-cutlery" />Recipe Box</h1>
                    <button className="btn btn-add" onClick={this.editRecipe}>Add New Recipe<i className="fa fa-plus header-plus"></i></button>
                </div>
                <div className="title-box  overlay">
                    <h2>Create &amp; Store your own Delicious Food and Drink Recipes!</h2>
                </div>
            </div>
        );
    }
}

export default Header;