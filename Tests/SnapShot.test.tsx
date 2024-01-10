
import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from "react-redux";
import { store } from "../src/Store/store";
import App from "../src/App";
import React from "react";

//***********************************SnapShot  TEST *********************************** والله أعلم*/
describe('List of Player', () => {
    it('renders snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>);
        expect(container.firstChild).toMatchSnapshot();
    });
});
