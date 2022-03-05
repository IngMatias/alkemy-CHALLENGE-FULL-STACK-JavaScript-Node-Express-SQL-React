import React, { Component } from "react"

class Total extends Component {
    constructor(props) {
        super(props)
        
    }
    total(movements) {
        let total = 0
        movements.map(movement => {
            if (movement.Type == 'input') {
                total += Math.abs(movement.Value)
            }
            if (movement.Type == 'output') {
                total -= Math.abs(movement.Value)
            }
        })
        return total
    }
    render() {
        return(<div className="total-container">
            <label>Total: {this.total(this.props.movements)}</label>
        </div>)
    }
}

export default Total