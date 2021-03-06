import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApplicationProgressButtonsWidget from './ApplicationProgressButtonsWidget';
import UserDocumentsSelectionList from 'Shared/userDocuments/UserDocumentsSelectionList';
import UserDocumentsUploadWidget from 'Shared/userDocuments/UserDocumentsUploadWidget';
import { startDecrementCurrentStep, startIncrementCurrentStep } from 'Actions/applicationProcess';

export class ApplicationUserDocumentsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    handleDecrementStep = () => {
        this.props.startDecrementCurrentStep();
    }

    handleIncrementStep = () => {
        this.props.startIncrementCurrentStep();
    }

    render() {
        return (
            <div className="application_user_documents_container">
                {this.props.applicationUserDocuments.length == 0 &&
                    <div className="application_user_documents_container__no_docs">
                        Please select at least one document to continue
                </div>
                }
                {this.props.applicationUserDocuments.length > 0 &&
                    <ApplicationProgressButtonsWidget
                        handleDecrementStep={this.handleDecrementStep}
                        handleIncrementStep={this.handleIncrementStep}
                    />
                }
                <div className="application_user_documents__wrapper">
                    <UserDocumentsSelectionList
                        applicationUserDocuments={this.props.applicationUserDocuments}
                        userDocuments={this.props.userDocuments}
                    />
                </div>

                <div className="application_user_documents__wrapper">
                    <UserDocumentsUploadWidget />
                </div>
            </div>
        );
    }
}

/* istanbul ignore next */
const mapStateToProps = (state) => ({
    applicationUserDocuments: state.application.userDocuments,
    userDocuments: state.userDocuments,
});

/* istanbul ignore next */
const mapDispatchToProps = (dispatch) => ({
    startDecrementCurrentStep: () => dispatch(startDecrementCurrentStep()),
    startIncrementCurrentStep: () => dispatch(startIncrementCurrentStep()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUserDocumentsContainer);

ApplicationUserDocumentsContainer.propTypes = {
    applicationUserDocuments: PropTypes.array.isRequired,
    startDecrementCurrentStep: PropTypes.func.isRequired,
    startIncrementCurrentStep: PropTypes.func.isRequired,
    userDocuments: PropTypes.array.isRequired,
};
