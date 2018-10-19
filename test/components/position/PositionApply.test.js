import React from 'react';
import { shallow } from 'enzyme';
import { PositionApply } from 'Position/PositionApply';

describe('PositionApply', () => {
    const startLogin = jest.fn();
    const startSetPositionId = jest.fn();
    let wrapper;

    const buildWrapper = (isAuthenticated = true) => {
        wrapper = shallow(
            <PositionApply
                isAuthenticated={isAuthenticated}
                startLogin={startLogin}
                startSetPositionId={startSetPositionId}
            />
        );
    };

    describe('when user is Authenticated', () => {
        beforeEach(() => {
            buildWrapper();
        })

        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });

    describe('when user is NOT Authenticated', () => {
        beforeEach(() => {
            buildWrapper(false);
        })

        it('should render correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        it('should call startSetPositionId', () => {
            wrapper.find('.button').simulate('click');

            expect(startSetPositionId).toHaveBeenCalled();
        });

        it('should call startLogin with apply redirectUrl', () => {
            wrapper.find('.button').simulate('click');

            expect(startLogin).toHaveBeenLastCalledWith('apply');
        });

        it('should call startSetPositionId before startLogin', () => {
            wrapper.find('.button').simulate('click');

            expect(startSetPositionId).toHaveBeenCalledBefore(startLogin);
        });
    });
});
