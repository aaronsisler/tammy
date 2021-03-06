import React from 'react';
import { shallow } from 'enzyme';
import { PositionWatchEditWidget } from 'PositionWatch/PositionWatchEditWidget';
import positionsWatched from '../../fixtures/positionsWatched';

describe('PositionWatchEditWidget', () => {
    const [positionWatched] = positionsWatched;
    const { positionId, notificationLevel } = positionWatched;
    const startRemovePositionWatch = jest.fn();
    const startSetPositionWatchLevel = jest.fn();
    let wrapper;

    const buildWrapper = (positionWatchedInput = positionWatched) => {
        wrapper = shallow(
            <PositionWatchEditWidget
                positionId={positionId}
                positionsWatched={[positionWatchedInput]}
                startRemovePositionWatch={startRemovePositionWatch}
                startSetPositionWatchLevel={startSetPositionWatchLevel}
            />
        );
    };

    beforeEach(() => {
        buildWrapper();
    });

    it('should render PositionWatchEditWidget correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should set the notificationLevel correctly on construction', () => {
        expect(wrapper.find('select').prop('value')).toEqual(notificationLevel);
    });

    it('should render PositionWatchEditWidget correctly when positions watched does not contain a matching position id', () => {
        buildWrapper({ positionId: 'nonMatchingPositionId' })

        expect(wrapper).toMatchSnapshot();
    });

    describe('when the notification select input is changed', () => {
        it('should call startSetPositionWatchLevel with positionId and new notification level', () => {
            const newNotificationLevel = 'SOME';
            const event = { target: { value: newNotificationLevel } };

            wrapper.find('select').simulate('change', event);

            expect(startSetPositionWatchLevel).toHaveBeenLastCalledWith(positionId, newNotificationLevel);
        });

        it('should set the new notification level correctly', () => {
            const newNotificationLevel = 'SOME';
            expect(wrapper.find('select').prop('value')).toEqual(notificationLevel);

            wrapper.setProps({ positionsWatched: [{ positionId, notificationLevel: newNotificationLevel }] });

            expect(wrapper.find('select').prop('value')).toEqual(newNotificationLevel);
        });
    });

    describe('when the remove notification button is clicked', () => {
        it('should call startRemovePositionWatch with positionId', () => {
            wrapper.find('button').simulate('click');

            expect(startRemovePositionWatch).toHaveBeenLastCalledWith(positionId);
        });
    });
});
