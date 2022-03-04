import React, { Component } from 'react'

class CategoriesContainer extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (<div>
            <ul>
                {this.props.categories.map((category, index) => {
                    return (<div key={index}>
                        <li>{category.Category}</li>
                        <button onClick={(e) => this.props.deleteCategory(e, category.CategoryId)}>Delete Category</button>
                    </div>)
                })}
            </ul>
        </div>)
    }
}

export default CategoriesContainer