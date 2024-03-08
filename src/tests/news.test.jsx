import { fireEvent, render, screen } from '@testing-library/react';
import { NewsPage } from '../pages/userContent/news';
import { PageProvider } from '../context/GlobalContext';
import React from 'react';


describe('<NewsPage /> Tests', () => {

    test('Match Snapshot', () => {
        const { container } = render(
        <PageProvider>
            <NewsPage />
        </PageProvider>);
        expect( container ).toMatchSnapshot();
    });

    test('Show Title of Page', () => {
        render(
            <PageProvider>
                <NewsPage />
            </PageProvider>
        );
        expect( screen.getByText("News") ).toBeTruthy();
    });
});