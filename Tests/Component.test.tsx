import { render, screen, fireEvent, waitFor, } from '@testing-library/react';
import { store } from "../src/Store/store"
import { describe, it, expect, beforeEach } from "vitest";
import App from '../src/App';
import React from 'react';
import { Provider } from 'react-redux';

describe('Test App component', () => {
  //***********************************UNIT TEST : Component************************************/
  it('Test show all player ', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {

      expect(screen.getByText('Chess Leaderboards')).toBeInTheDocument();

      const tableRows = screen.getAllByRole('row');

      expect(tableRows).toHaveLength(6);


    });

    //**************************SIMULATE DELET PLAYER*****************//
    console.log("player exist")
    expect(screen.getByText('V5K')).toBeInTheDocument();
    await waitFor(() => {
      const deleteButton = screen.getAllByRole('button', { name: /Delete/ })[1];
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {

      const confirmButton = screen.getByText('Confirm');
      fireEvent.click(confirmButton);
    });

    await waitFor(() => {
      const deletedPlayer = 'V5K';
      expect(screen.queryByText(deletedPlayer)).not.toBeInTheDocument();
    });
  });

  //**************************End to End Test :Simulate Search for PLAYER(tax77)*****************/
  it('Test search for a player', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Chess Leaderboards')).toBeInTheDocument();
    });

    const searchInput = await screen.findByTestId('search');
    await waitFor(() => {

      fireEvent.change(searchInput, { target: { value: 'tax77' } });
    });
    await waitFor(() => {
      const tableRows = screen.getAllByRole('row');
      expect(tableRows).toHaveLength(2);
    });

    expect(screen.getByText('tax77')).toBeInTheDocument();
  });
});