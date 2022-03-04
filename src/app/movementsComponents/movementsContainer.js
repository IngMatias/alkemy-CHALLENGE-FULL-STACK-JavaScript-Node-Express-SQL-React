import React, { Component } from 'react'

class MovementsContainer extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (<div>
            {this.props.movements.map((movement, index) => {
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