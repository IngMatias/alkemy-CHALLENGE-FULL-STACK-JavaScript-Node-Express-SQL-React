import React, { Component } from 'react'

class MovementsContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            allMovementsButton: 'Show all',
            allMovements: false
        }
        this.firstTen = this.firstTen.bind(this)
        this.changeShow = this.changeShow.bind(this)
    }
    firstTen() {
        if (! this.state.allMovements) {
            return this.props.movements.slice(0, Math.min(this.props.movements.length, 10))
        } else {
            return this.props.movements
        }
    }
    changeShow() {
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state))
            newState.allMovements = ! newState.allMovements
            newState.allMovementsButton = newState.allMovementsButton == 'Show all' ? 'Show last ten' : 'Show all'
            return newState
        }) 
    }
    render() {
        return (<div>
            <button onClick={this.changeShow}>{this.state.allMovementsButton}</button>
            {this.firstTen().map((movement, index) => {
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