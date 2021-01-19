
import React from 'react'
import App from './App'
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { getOrders, addNewOrder } from '../../apiCalls'
jest.mock('../../apiCalls')

describe('App', () => {
  it('should render orders', async () => {
    const mockOrders =[
    {id: 24, name: 'James', ingredients: ['steak', 'lettuce']},
    {id: 25, name: 'Steph', ingredients: ['beans', 'jalapeno']}
    ]
    getOrders.mockResolvedValue({ orders: mockOrders })
    render(
      <App />
    )
    await waitFor(() => expect(screen.getByText('James')).toBeInTheDocument())
    await waitFor(() => expect(screen.getByText('Steph')))
  }),

  it("should clear the form when the order is submitted", () => {
    render(
      <App />
    );
    const steakButton = screen.getByText("steak");
    const beansButton = screen.getByText("beans");
    const submitButton = screen.getByText("Submit Order");

    userEvent.click(steakButton);
    userEvent.click(beansButton);
    userEvent.type(screen.getByPlaceholderText("Name"), "Jo");
    userEvent.click(submitButton);

    expect(screen.getByPlaceholderText("Name").value).toEqual("");
    expect(screen.getByText('Order: Nothing selected')).toBeInTheDocument();
    expect(screen.getByText('Jo')).toBeInTheDocument();
  });
})
