import React from 'react';
import { shallow } from 'enzyme';
import { PositionDetails } from 'Position/PositionDetails';
import { position, positionId } from '../../fixtures/positions';

import history from 'Tools/history';
jest.mock('Tools/history');

describe('PositionDetails', () => {
    let wrapper;

    const buildWrapper = (positionIdInput, positionInput) => {
        wrapper = shallow(
            <PositionDetails
                position={positionInput}
                positionId={positionIdInput}
            />
        );
    };

    describe('when positionId is available', () => {
        describe('when position is available', () => {
            const push = jest.fn();
            beforeEach(() => {
                history.push = push
                buildWrapper(positionId, position);
            });

            it('should render correctly', () => {
                expect(wrapper).toMatchSnapshot();
            });

            describe('when button is clicked', () => {
                it('should navigate to the correct route', () => {
                    wrapper.find('button').simulate('click');

                    expect(push).toHaveBeenLastCalledWith('/positions');
                });
            });
        });

        describe('when position is NOT available', () => {
            beforeEach(() => {
                buildWrapper(positionId, undefined);
            });

            it('should render correctly', () => {
                expect(wrapper).toMatchSnapshot();
            });
        });
    });

    describe('when positionId is NOT available', () => {
        it('should render correctly', () => {
            buildWrapper(undefined, undefined);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
