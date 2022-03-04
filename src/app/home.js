import React, { Component } from 'react'

import CategoryForm from './movementsComponents/categoryForm'
import CategoriesContainer from './movementsComponents/categoriesContainer'
import MovementForm from './movementsComponents/movementForm'
import MovementsContainer from './movementsComponents/movementsContainer'
import Total from './movementsComponents/total'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            total: 0,
            movements: [],
            categories: []
        }
        this.deleteCategory = this.deleteCategory.bind(this)
        this.deleteMovement = this.deleteMovement.bind(this)
    }

    componentDidMount() {
        this.getMovements()
        this.getCategories()
    }
    getMovements() {
        fetch('/movementsAPI/movements')
        .then(res => res.json())
        .then(data => {
            this.setState((state) => {
                const newState = JSON.parse(JSON.stringify(state))
                newState.movements = data
                return newState
            })
        })
    }
    getCategories() {
        fetch('/movementsAPI/categories')
        .then(res => res.json())
        .then(data => {
            this.setState((state) => {
                const newState = JSON.parse(JSON.stringify(state))
                newState.categories = data
                return newState
            })
        })
    }
    addMovement(e, data) {
        fetch('/movementsAPI/movement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }
    deleteMovement(e, movementId) {
        e.preventDefault()
        fetch('/movementsAPI/movement', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {movementId} )
        })
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.movements = newState.movements.filter(movement => movement.MovementId != movementId)
            return newState
        })
    }
    addCategory(e, category) {
        fetch('/movementsAPI/category',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( {category} )
        })
    }
    deleteCategory(e, categoryId) {
        e.preventDefault()
        fetch('/movementsAPI/category', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categoryId })
        })
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.categories = newState.categories.filter(category => category.CategoryId != categoryId)
            return newState
        })
    }
    render() {
        return(<div id='home-container'>
            <CategoryForm addCategory={this.addCategory}/>
            <CategoriesContainer categories={this.state.categories} deleteCategory={this.deleteCategory}/>
            <MovementForm categories={this.state.categories} addMovement={this.addMovement}/>
            <Total movements={this.state.movements}></Total>
            <MovementsContainer movements={this.state.movements} deleteMovement={this.deleteMovement}/>
        </div>)
    }
}

export default Home 