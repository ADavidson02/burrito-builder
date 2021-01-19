
import React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import OrderForm from './OrderForm';
jest.mock("../../apiCalls");
import { addOrder } from '../../apiCalls'

describe('OrderForm', () => {
  it('should render a form with a name input and list of ingredients', () => {
    render(
      <OrderForm />
    )

    expect(screen.getByText('steak')).toBeInTheDocument()
    expect(screen.getByText('sour cream')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    const submitButton = screen.getByText('Submit Order')
    expect(submitButton).toBeInTheDocument()
  })

  it('should show an error when a name is not added', () => {
    render(
      <OrderForm />
    )
    const steakButton = screen.getByText('steak')
    const beansButton = screen.getByText('beans')
    const submitButton = screen.getByText("Submit Order");
    expect(submitButton).toBeInTheDocument();
    userEvent.click(steakButton)
    userEvent.click(beansButton)
    userEvent.click(submitButton)
    expect(screen.getByText('Please add a name to your order'))
  }),

  it('should show an error when an ingredient is not added', () => {
    render(
      <OrderForm />
    )
    userEvent.type(screen.getByPlaceholderText('Name'), 'Sally')
    const submitButton = screen.getByText("Submit Order");
    userEvent.click(submitButton)
    expect(screen.getByText('Please add at least one ingredient to your burrito'))
  }),

  it('should reflect what is added to the form', () => {
    render(
      <OrderForm />
    )

    const steakButton = screen.getByText("steak")
    const beansButton = screen.getByText("beans")
    userEvent.click(steakButton)
    userEvent.click(beansButton)
    userEvent.type(screen.getByPlaceholderText("Name"), "Sam")
    expect(screen.getByPlaceholderText('Name').value).toEqual('Sam')
    expect(screen.queryByText('Order: steak, beans')).toBeInTheDocument()
  }),
  it('should clear the form when the order is submitted', () => {
    const mockAddOrder = jest.fn
    render(
      <OrderForm addOrder={mockAddOrder}/>
    )
    const steakButton = screen.getByText("steak");
    const beansButton = screen.getByText("beans");
    const submitButton = screen.getByText("Submit Order");

    userEvent.click(steakButton);
    userEvent.click(beansButton);
    userEvent.type(screen.getByPlaceholderText("Name"), "Jo");
    userEvent.click(submitButton);

    expect(screen.getByPlaceholderText('Name').value).toEqual('')
  })

})