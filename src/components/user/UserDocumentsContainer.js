import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserDocumentsUploadWidget from '../shared/userDocuments/UserDocumentsUploadWidget';
import UserDocumentsList from '../shared/userDocuments/UserDocumentsList';

export class UserDocumentsContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.userDocuments &&
                    <div id="user_documents_container">
                        <UserDocumentsUploadWidget />
                        <UserDocumentsList
                            userDocuments={this.props.userDocuments}
                        />
                    </div>
                }
            </div>
        );
    }
}

/* istanbul ignore next */
const mapStateToProps = (state) => ({
    userDocuments: state.userDocuments,
})

export default connect(mapStateToProps)(UserDocumentsContainer);

UserDocumentsContainer.propTypes = {
    userDocuments: PropTypes.array,
};