import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import selectPositions from '../../selectors/positions';
import LoadingPage from '../core/LoadingPage';
import PositionList from './PositionList';
import PositionListFilter from './PositionListFilter';
import PositionDetails from './PositionDetails';
import PositionApply from './PositionApply';

export class PositionContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="position_container">
                {!this.props.positions && <LoadingPage />}
                {this.props.positions &&
                    <div className="position_widget">
                        <div className="position_list_wrapper">
                            <PositionListFilter />
                            <PositionList positions={this.props.positions} />
                        </div>
                        <div className="position_details_wrapper">
                            <PositionDetails />
                            {this.props.position &&
                                <PositionApply />
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    positions: selectPositions(state.positions, state.filters.positions),
    position: state.position,
});

export default connect(mapStateToProps)(PositionContainer);


PositionContainer.propTypes = {
    positions: PropTypes.array,
    position: PropTypes.object,
};

