import React, { Component } from "react"

class CategoryForm extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            newCategory: ''
        }

        this.changeNewCategory = this.changeNewCategory.bind(this)
        this.submitNewCategory = this.submitNewCategory.bind(this)
    }
    submitNewCategory(e) {
        this.props.addCategory(e, this.state.newCategory)
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.newCategory = ''
            return newState
        })
    }
    changeNewCategory(e) {
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.newCategory = e.target.value
            return newState
        })
    }
    render() {
        return (<div>
            <form onSubmit={this.submitNewCategory}>
                <div>
                    <label>
                        New category: 
                    </label>
                    <input onChange={this.changeNewCategory} value={this.state.newCategory} required></input>
                </div>
                <button>Add Category</button>
            </form>
        </div>)
    }
}

export default CategoryForm