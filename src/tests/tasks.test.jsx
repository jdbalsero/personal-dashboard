import { fireEvent, render, screen } from '@testing-library/react';
import { TasksPage} from '../pages/userContent/tasks';
import { PageProvider } from '../context/GlobalContext';
import React from 'react';
import { act } from 'react-dom/test-utils';


describe('<TasksPage /> Tests', () => {

    test('Match Snapshot', () => {
        const { container } = render(
        <PageProvider>
            <TasksPage />
        </PageProvider>);
        expect( container ).toMatchSnapshot();
    });

    test('Show Title of Page', () => {
        render(
            <PageProvider>
                <TasksPage />
            </PageProvider>
        );
        expect( screen.getByText("Tasks") ).toBeTruthy();
    });

    test('Show Empty Message', () => {

        render(
            <PageProvider>
                <TasksPage />
            </PageProvider>
        );

        expect( screen.getByText("You don't have any task in the list") ).toBeTruthy();
    });

    test('Input and Creation Test', () => {

        render(
            <PageProvider>
                <TasksPage />
            </PageProvider>
        );

        const input = screen.getByPlaceholderText('Type the task you need');

        fireEvent.input( input, { target: { value: 'Task 1 Test' } });

        expect( input.value ).toBe('Task 1 Test');

        const button = screen.getByRole('button');
        fireEvent.click( button );


        //Evaluate the success alert
        expect( screen.getByText("Success") ).toBeTruthy();
        expect( screen.getByText("To Do Task Saved.") ).toBeTruthy();

        //Evaluate the list item with active status
        expect( screen.getByText("Task 1 Test") ).toBeTruthy();
        expect( screen.getByText("Status: Active") ).toBeTruthy();
        expect( input.value ).toBe('');
    });

    test('Task Alert Deletion Test', () => {
        render(
            <PageProvider>
                <TasksPage />
            </PageProvider>
        );

        //Ensuring initial conditions
        const input = screen.getByPlaceholderText('Type the task you need');
        expect( screen.getByText("Task 1 Test") ).toBeTruthy();
        expect( screen.getByText("Status: Active") ).toBeTruthy();
        expect( input.value ).toBe('');

        //Delete action
        const button = screen.getByRole('button', { name: 'delete' });
        fireEvent.click( button );


        //Evaluate the warning Alert
        expect( screen.getByText("Are you Sure?") ).toBeTruthy();
        expect( screen.getByText("Do you want to delete this to do task ?") ).toBeTruthy();
        expect (screen.getByRole('button', {name:"Yes, I want to delete it."})).toBeTruthy();
    });
});