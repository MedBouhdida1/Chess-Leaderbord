import axios from "axios";
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from "../src/Store/store";
import { fetchDataFailure } from "../src/Store/actions";



describe('App', () => {
    //***********************************Integration  TEST : Happy path***********************************/
    it('succeeds fetching data : Happy path', async () => {

        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(screen.queryByTestId('loading')).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByTestId('loading')).toBeNull());
        expect(screen.queryByTestId('loading')).toBeNull();
    });
    //***********************************Integration  TEST : Unhappy path**********************************/
    it('fails fetching data : unhappy path', async () => {

        render(<Provider store={store}>
            <App />
        </Provider>);
        expect(screen.queryByTestId('loading')).toBeInTheDocument();
        try {
            store.dispatch(fetchDataFailure("Server error"))
        } catch (error) {
            expect(screen.queryByTestId('loading')).toBeNull()
            await waitFor(() => expect(screen.queryByTestId('error')).toBeInTheDocument());
        }
    });

});