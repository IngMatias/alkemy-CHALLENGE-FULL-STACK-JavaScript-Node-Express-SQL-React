import React, { Component } from "react"

class MovementForm extends Component {
    constructor(props){
        super(props)
    
        this.submitHandler = this.submitHandler.bind(this)
    }
    submitHandler(e) {
        this.props.addMovement(e, {
            value: e.target.value.value,
            type: e.target.type.value,
            categoryId: e.target.categoryId.value,
            description: e.target.description.value,
            date: e.target.date.value
        }) 
    }
    render() {
        return (<div>
            <form onSubmit={this.submitHandler} className='movement-form'>
                <label>Value:</label>
                <input type='number' name='value' required></input>

                <label>Type:</label>
                <select name='type'>
                    <option>input</option>
                    <option>output</option>
                </select>

                <label>Category:</label>
                <select name='categoryId' required>
                    {this.props.categories.map((category, index) => {
                        return (
                            <option key={index} value={category.CategoryId}>{category.Category}</option>
                        )
                    })}
                </select>

                <label>Description:</label>
                <input type='text' name='description' required></input>

                <label>Date:</label>
                <input type='date' name='date' required></input>

                <button>Add movement</button>
            </form>
        </div>)
    }
}

export default MovementForm