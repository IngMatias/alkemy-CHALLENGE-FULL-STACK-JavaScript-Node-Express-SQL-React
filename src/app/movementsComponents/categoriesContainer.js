import React, { Component } from 'react'
import { render } from 'react-dom'

class CategoriesContainer extends Component {
    constructor(props) {
        super(props)

    }
    deleteCategory(e, categoryId) {
        const categoryInUse = this.props.movements.some(movement => movement.CategoryId == categoryId)
        if (categoryInUse) {
            render(
                <span className='disappearingMessage'>Category in use</span>,
                document.getElementById(categoryId)
            )
        } else {
            this.props.deleteCategory(e, categoryId)
        }
    }
    render() {
        return (<div>
            <ul>
                {this.props.categories.map((category, index) => {
                    return (<div key={index} className='category-container'>
                        <li>{category.Category}</li>
                        <button onClick={(e) => this.deleteCategory(e, category.CategoryId)}>Delete</button>

                        <div id={category.CategoryId}></div>
                    </div>)
                })}
            </ul>
        </div>)
    }
}

export default CategoriesContainer