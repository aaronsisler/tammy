import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as applicationActionHelpers from 'Actions/helpers/application';
import { user } from '../fixtures/user';
import userDocuments from '../fixtures/userDocuments';
import {
    startAddApplicationUserDocument,
    startClearApplication,
    startRemoveApplicationUserDocument,
    startSetApplicationUser
} from 'Actions/application';

const createMockStore = configureMockStore([thunk]);

describe('Application Actions', () => {
    const [userDocument] = userDocuments;
    const { userDocumentId } = userDocument;

    describe('startAddApplicationUserDocument() method', () => {
        it(`should call dispatch with addApplicationUserDocument`, async () => {
            const addApplicationUserDocumentMock = jest.spyOn(applicationActionHelpers, 'addApplicationUserDocument');
            const store = createMockStore({ userDocuments });

            await store.dispatch(startAddApplicationUserDocument(userDocumentId));

            expect(store.getActions().length).toBe(1);
            expect(addApplicationUserDocumentMock).toHaveBeenLastCalledWith(userDocument);
        });
    });

    describe('startClearApplication() method', () => {
        it(`should call dispatch with clearApplication`, async () => {
            const clearApplicationMock = jest.spyOn(applicationActionHelpers, 'clearApplication');
            const store = createMockStore();

            await store.dispatch(startClearApplication());

            expect(store.getActions().length).toBe(1);
            expect(clearApplicationMock).toHaveBeenCalled();
        });
    });

    describe('startRemoveApplicationUserDocument() method', () => {
        it(`should call dispatch with removeApplicationUserDocument`, async () => {
            const removeApplicationUserDocumentMock = jest.spyOn(applicationActionHelpers, 'removeApplicationUserDocument');
            const store = createMockStore();

            await store.dispatch(startRemoveApplicationUserDocument(userDocumentId));

            expect(store.getActions().length).toBe(1);
            expect(removeApplicationUserDocumentMock).toHaveBeenLastCalledWith(userDocumentId);
        });
    });

    describe('startSetApplicationUser() method', () => {
        it(`should call dispatch with setApplicationUser`, async () => {
            const setApplicationUserMock = jest.spyOn(applicationActionHelpers, 'setApplicationUser');
            const store = createMockStore({ user });

            await store.dispatch(startSetApplicationUser(user));

            expect(store.getActions().length).toBe(1);
            expect(setApplicationUserMock).toHaveBeenLastCalledWith(user);
        });
    });
});