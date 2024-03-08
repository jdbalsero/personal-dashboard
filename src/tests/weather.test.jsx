import { render, screen } from '@testing-library/react';
import { WeatherPage} from '../pages/userContent/weather';
import { PageProvider } from '../context/GlobalContext';
import React from 'react';


describe('<WeatherPage /> Tests', () => {

    test('Match Snapshot', () => {
        const { container } = render(
        <PageProvider>
            <WeatherPage />
        </PageProvider>);
        expect( container ).toMatchSnapshot();
    });

    test('Show Title of Page', () => {
        render(
            <PageProvider>
                <WeatherPage />
            </PageProvider>
        );
        expect( screen.getByText("Real-Time Weather") ).toBeTruthy();
    });

    test('Show Permission Message until user access', () => {

        render(
            <PageProvider>
                <WeatherPage />
            </PageProvider>
        );

        expect( screen.getByText("Loading... (You must accept the location permission in your browser)") ).toBeTruthy();
    });
});