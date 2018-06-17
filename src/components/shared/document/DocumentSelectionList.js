import React from 'react';
import PropTypes from 'prop-types';
import DocumentSelectListItem from './DocumentSelectListItem';

export default class DocumentSelectionList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        if (this.props.documents.length === 0) {
            return (
                <div className="document_selection_list empty">
                    No available items
                </div>
            );
        }

        return (
            <div className="document_selection_list">
                {
                    this.props.documents.map((document, index) =>
                        <DocumentSelectListItem key={index} {...document} />)
                }
            </div>
        );
    }
}

DocumentSelectionList.propTypes = {
    documents: PropTypes.array,
};
