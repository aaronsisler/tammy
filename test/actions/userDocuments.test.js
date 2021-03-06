import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import database from 'Firebase/firebase';
import { startAddUserDocument, startSetUserDocuments } from 'Actions/userDocuments';
import * as userDocumentActionHelpers from 'Actions/helpers/userDocuments';
import userDocuments from '../fixtures/userDocuments';
import { defaultAuthState } from '../fixtures/auth';

const createMockStore = configureMockStore([thunk]);

describe('User Documents Actions', () => {
    let store;
    let once;
    let push;
    const { uid: mockUserId } = defaultAuthState.auth;
    const userDocumentsMock = [];
    userDocuments.forEach((userDocument) => {
        const val = () => ({ ...userDocument });
        userDocumentsMock.push({ key: userDocument.userDocumentId, val })
    });

    beforeEach(() => {
        store = createMockStore(defaultAuthState);
        once = jest.fn().mockResolvedValue(userDocumentsMock);
        push = jest.fn().mockResolvedValue(userDocumentsMock[0]);
        jest.spyOn(database, 'ref').mockReturnValue({ once, push });
    });

    afterEach(() => {
        database.ref.mockRestore();
    });

    describe('startSetUserDocuments() method', () => {
        it(`should call dispatch with setUserDocuments`, async () => {
            const setUserDocumentsMock = jest.spyOn(userDocumentActionHelpers, 'setUserDocuments');

            await store.dispatch(startSetUserDocuments());

            expect(store.getActions().length).toBe(1);
            expect(setUserDocumentsMock).toHaveBeenCalledWith(userDocuments);
        });

        it(`should call database ref with specific path`, async () => {
            await store.dispatch(startSetUserDocuments());

            expect(database.ref).toHaveBeenLastCalledWith(`user_documents/${mockUserId}`)
        });

        it(`should call once with value`, async () => {
            await store.dispatch(startSetUserDocuments());

            expect(once).toHaveBeenLastCalledWith('value');
        });
    });

    describe('startAddUserDocument() method', () => {
        const [userDocument] = userDocuments;

        it(`should call dispatch with addUserDocument`, async () => {
            const addUserDocumentMock = jest.spyOn(userDocumentActionHelpers, 'addUserDocument');

            await store.dispatch(startAddUserDocument(userDocument));
            const [[uploadedDocument]] = addUserDocumentMock.mock.calls;

            expect(store.getActions().length).toBe(1);
            expect(addUserDocumentMock).toHaveBeenCalledWith({
                ...userDocument,
                dateUploaded: expect.any(String),
            });
            expect(!!Date.parse(uploadedDocument.dateUploaded)).toBe(true);
        });

        it(`should call database ref with specific path`, async () => {
            await store.dispatch(startAddUserDocument(userDocument));

            expect(database.ref).toHaveBeenLastCalledWith(`user_documents/${mockUserId}`)
        });

        it(`should call push with uploaded document`, async () => {
            const { documentName, downloadUrl } = userDocument;
            await store.dispatch(startAddUserDocument(userDocument));

            expect(push).toHaveBeenLastCalledWith({ documentName, downloadUrl, dateUploaded: expect.any(String), });
        });
    });
});
