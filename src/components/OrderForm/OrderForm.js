import React, { Component } from 'react';
import { addNewOrder, getOrders } from "../../apiCalls";

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      errorItem: false,
      errorName: false,
    };
  }



  handleSubmit = e => {
    e.preventDefault();
    if(!this.state.ingredients.length) {
      return this.setState({errorItem: true})
    } else if( !this.state.name.length) {
      return this.setState({errorName: true})
    }
    const { addOrder } = this.props;
    const newOrder = {...this.state, id: Date.now()}
    addNewOrder(Date.now(), this.state.name, this.state.ingredients)
    addOrder(newOrder)
    this.clearInputs();
   
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  handleNameChange = event => {
    this.setState({name: event.target.value})
  }

  handleIngredientChange = event => {
    event.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, event.target.value]})
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} value={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
        {this.state.errorItem === true && <h2>Please add at least one ingredient to your burrito</h2>}
        {this.state.errorName === true && <h2>Please add a name to your order</h2>}
      </form>
    )
  }
}

export default OrderForm;
