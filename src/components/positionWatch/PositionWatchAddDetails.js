import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import history from 'Tools/history';
import PositionDetailsContent from 'Position/PositionDetailsContent';
import PositionWatchAddWidget from 'PositionWatch/PositionWatchAddWidget';

export class PositionWatchAddDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNavigateBack = () => history.push('/position_watch_add');

    render() {
        const { position } = this.props;
        if (!position) {
            return (
                <div className="inbox_details__empty inbox_mobile">
                    Please select an item to view
                </div>
            )
        }

        return (
            <div className="inbox_details" >
                <div className="inbox_details_header">
                    <div className="inbox_details_header__actions">
                        <button
                            className="inbox_details_header__mobile_button"
                            onClick={this.handleNavigateBack}
                        >
                            Back to List
                        </button>
                    </div>
                    <div className="inbox_details_header__content">
                        <div className="inbox_details_header__title">
                            {position.title}
                        </div>
                        <div className="inbox_details_header__job_id">
                            Job Id: {position.jobId}
                        </div>
                        <div className="inbox_details_header__location">
                            Location: {position.location}
                        </div>
                    </div>
                </div>
                <div className="inbox_details_content">
                    <PositionWatchAddWidget positionId={this.props.positionId} />
                    <PositionDetailsContent position={position} />
                </div>
            </div>
        );
    }
}

/* istanbul ignore next */
const mapStateToProps = (state, props) => {
    const { positionId } = props.match.params;
    const position = positionId
        ? state.positions.find((statePosition) => statePosition.positionId == positionId)
        : undefined;

    return ({
        position,
        positionId,
    });
};

export default connect(mapStateToProps)(PositionWatchAddDetails);

PositionWatchAddDetails.propTypes = {
    position: PropTypes.object,
    positionId: PropTypes.string,
};

