import database from 'Firebase/firebase';
import {
    addApplicationUserDocument,
    removeApplicationUserDocument,
    setApplicationUser,
    submitApplication,
} from 'Actions/helpers/application';

export const startAddApplicationUserDocument = (userDocumentId) => (dispatch, getState) => {
    const { userDocuments } = getState();
    const userDocumentMatch = userDocuments.find((userDocument) => userDocument.userDocumentId == userDocumentId)
    return dispatch(addApplicationUserDocument(userDocumentMatch))
}

export const startRemoveApplicationUserDocument = (userDocumentId) => (dispatch) =>
    dispatch(removeApplicationUserDocument(userDocumentId))

export const startSetApplicationUser = () => (dispatch, getState) => {
    const { user } = getState();
    return dispatch(setApplicationUser(user));
}

export const startSubmitApplication = (positionId) => (dispatch, getState) => {
    const { user, userDocuments } = getState().application;
    return database.ref(`applicants/${positionId}`).push({
        applicantStatus: 'APPLIED',
        user,
        userDocuments,
    }).then(() => dispatch(submitApplication()));
}
