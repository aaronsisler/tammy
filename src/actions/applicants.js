import database from 'Firebase/firebase';
import { setApplicants } from 'Actions/helpers/applicants';
import { setApplicantsTextFilter } from 'Actions/filters/applicantsText';

export const startClearApplicants = () => (dispatch) => dispatch(setApplicants());

export const startSetApplicants = (positionId) => (dispatch) =>
    database.ref(`applicants/${positionId}`).once('value').then((snapshot) => {
        const applicants = [];
        snapshot.forEach((childSnapshot) => {
            const applicant = childSnapshot.val();
            const applicantNotes = applicant.applicantNotes
                ? [...Object.values(applicant.applicantNotes)]
                : [];
            applicants.push({
                applicantId: childSnapshot.key,
                positionId,
                ...childSnapshot.val(),
                applicantNotes,
            });
        });

        return dispatch(setApplicants(applicants));
    });

export const startSetApplicantsTextFilter = (text) => (dispatch) => dispatch(setApplicantsTextFilter(text));
