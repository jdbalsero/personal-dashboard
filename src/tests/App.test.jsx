import App from '../pages/App';
import { render } from '@testing-library/react';


describe('Principal App Test', () => {

    test('Match Initial Snapshot', () => {
        const { container } = render(<App />);
        expect( container ).toMatchSnapshot();
    });
});