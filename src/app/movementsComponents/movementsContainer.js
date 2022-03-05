import React, { Component } from 'react'

class MovementsContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            orderByButton: 'Order By Category',
            allMovementsButton: 'Show all',
            byCategory: false,
            allMovements: false
        }
        this.movements = this.movements.bind(this)
        this.changeShow = this.changeShow.bind(this)
        this.orderByCategory = this.orderByCategory.bind(this)
    }
    movements() {
        let movements = []
        if (! this.state.allMovements) {
            movements = this.props.movements.slice(0, Math.min(this.props.movements.length, 10))
        } else {
            movements = this.props.movements
        }
        if (this.state.byCategory) {
            movements.sort((movement1, movement2) => {
                if(movement1.Category > movement2.Category) {
                    return 1
                }
                if(movement1.Category < movement2.Category) {
                    return -1
                }
                return 0
            })
        } else {
            movements.sort((movement1, movement2) => {
                if (movement1.MovementId > movement2.MovementId) {
                    return -1
                }
                if (movement1.MovementId < movement2.MovementId) {
                    return 1
                }
                return 0
            })
        }
        return movements
    }
    changeShow() {
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.allMovements = ! newState.allMovements
            newState.allMovementsButton = newState.allMovementsButton == 'Show all' ? 'Show last ten' : 'Show all'
            return newState
        }) 
    }
    orderByCategory() {
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.byCategory = ! newState.byCategory
            newState.orderByButton = newState.orderByButton == 'Order By Category' ? 'Order by inserted' : 'Order By Category'
            return newState
        })
    }
    render() {
        return (<div>
            <button onClick={this.changeShow}>{this.state.allMovementsButton}</button>
            <button onClick={this.orderByCategory}>{this.state.orderByButton}</button>
            {this.movements().map((movement, index) => {
                return (<li key={index} className='movement-container'>
                    <label>Value: {movement.Value}</label>
                    <label>Type: {movement.Type}</label>
                    <label>Category: {movement.Category}</label>
                    <label>Description: {movement.Description}</label>
                    <label>Date: {movement.Date}</label>
                    
                    <button onClick={(e) => this.props.deleteMovement(e, movement.MovementId)}>Delete movement</button>
                </li>)
            })}
        </div>)
    }
}

export default MovementsContainer