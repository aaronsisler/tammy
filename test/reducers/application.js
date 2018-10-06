import applicationReducer from 'Reducers/application';
import { clearApplication } from 'Actions/helpers/application';

const defaultState = {};

describe('application reducer', () => {
    it('should setup default state', () => {
        const action = {
            type: '@@INIT',
        }
        const state = applicationReducer(undefined, action);

        expect(state).toEqual(defaultState);
    });

    it('should clear the application', () => {
        const action = clearApplication();

        const state = applicationReducer(undefined, action);

        expect(state).toEqual({ user: {}, userDocuments: [] });
    });
});
