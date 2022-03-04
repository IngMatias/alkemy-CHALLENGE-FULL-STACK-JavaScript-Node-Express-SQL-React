import React, { Component } from 'react'

class MovementsContainer extends Component {
    constructor(props) {
        super(props)

    }
    render() {
        return (<div>
            {this.props.movements.map((movement, index) => {
                return (<div key={index}>
                    <div>
                        <label>Value: </label>
                        {movement.Value}
                    </div>
                        <label>Type: </label>
                        {movement.Type} 
                    <div>
                        <label>Category: </label>
                        {movement.Category}
                    </div>  
                        <label>Description: </label>
                        {movement.Description}
                    <div>
                        <label>Date: </label>
                        {movement.Date}
                    </div>
                    
                    <button onClick={(e) => this.props.deleteMovement(e, movement.MovementId)}>Delete movement</button>
                </div>)
            })}
        </div>)
    }
}

export default MovementsContainer