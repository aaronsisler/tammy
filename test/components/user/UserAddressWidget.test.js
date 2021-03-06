
import React from 'react';
import { shallow } from 'enzyme';
import UserAddressWidget from 'User/UserAddressWidget';
import user from '../../fixtures/user';
import InputTools from 'User/tools/inputs';
jest.mock('User/tools/inputs');

describe('UserAddressWidget', () => {
    const onSubmit = jest.fn();
    let wrapper;
    let inputToolsMock;
    const defaultEmptyState = {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
    };

    const buildWrapper = (userInput, isReadOnly = true, ) => {
        wrapper = shallow(
            <UserAddressWidget
                isReadOnly={isReadOnly}
                onSubmit={onSubmit}
                user={userInput}
            />);
    };

    it('should render correctly with default props', () => {
        buildWrapper({});

        expect(wrapper.state()).toEqual(defaultEmptyState);
    });

    describe('when user props change', () => {
        const newUser = {
            addressLine1: 'New Address Line 1',
            addressLine2: 'New Address Line 2',
            city: 'New City',
            state: 'New State',
            postalCode: 'New PostalCode',
        };

        beforeEach(() => {
            buildWrapper(user);
        });

        describe('when userId is the same', () => {
            it('should NOT update the state', () => {
                wrapper.setProps({
                    user: {
                        ...user,
                        ...newUser
                    }
                });

                expect(wrapper.state()).toEqual(
                    {
                        addressLine1: user.addressLine1,
                        addressLine2: user.addressLine2,
                        city: user.city,
                        state: user.state,
                        postalCode: user.postalCode
                    });
            });
        });

        describe('when userId is NOT the same', () => {
            it('should update the state', () => {
                wrapper.setProps(
                    {
                        user: {
                            ...newUser,
                            userId: 'Not Original Id'
                        }
                    });

                expect(wrapper.state()).toEqual(newUser);
            });

            it('should render correctly with default props', () => {
                wrapper.setProps(
                    {
                        user: {
                            userId: 'Not Original Id'
                        }
                    });

                expect(wrapper.state()).toEqual(defaultEmptyState);
            });
        });
    });

    describe('when isReadOnly is FALSE', () => {
        beforeEach(() => {
            InputTools.mockClear();
            buildWrapper(user, false);
            [inputToolsMock] = InputTools.mock.instances;
        });

        it('should render UserAddressWidget correctly', () => {
            expect(wrapper).toMatchSnapshot();
        });

        describe('Address Line 1 Input', () => {
            const name = 'addressLine1';
            const value = 'New Address Line 1';
            const target = { name, value };

            it('should set address line 1 on input change', () => {
                wrapper.find(`.user_address_widget__inputs > input`)
                    .at(0)
                    .simulate('change', { target });

                expect(wrapper.state(name)).toBe(value);
            });

            it('should call handleRequiredValidation on blur', () => {
                wrapper.find(`.user_address_widget__inputs > input`)
                    .at(0)
                    .simulate('blur');

                expect(inputToolsMock.handleRequiredValidation).toHaveBeenCalled();
            });
        })

        it('should set address line 2 on input change', () => {
            const name = 'addressLine2';
            const value = 'New Address Line 2';
            const target = { name, value };

            wrapper.find(`.user_address_widget__inputs > input`)
                .at(1)
                .simulate('change', { target });

            expect(wrapper.state(name)).toBe(value);
        });

        describe('City Input', () => {
            const name = 'city';
            const value = 'Durham';
            const target = { name, value };

            it('should set city on input change', () => {
                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(0)
                    .simulate('change', { target });

                expect(wrapper.state(name)).toBe(value);
            });

            it('should call handleRequiredValidation on blur', () => {
                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(0)
                    .simulate('blur');

                expect(inputToolsMock.handleRequiredValidation).toHaveBeenCalled();
            });
        });

        describe('State Input', () => {
            const name = 'state';

            it('should set state on valid input change', () => {
                const value = 'TN';
                const target = { name, value };

                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(1)
                    .simulate('change', { target });

                expect(wrapper.state(name)).toBe(value);
            });

            it('should NOT set state on invalid input change', () => {
                const value = '1';
                const target = { name, value };

                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(1)
                    .simulate('change', { target });

                expect(wrapper.state(name)).toBe(user[name]);
            });

            it('should call handleRequiredValidation on blur', () => {
                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(1)
                    .simulate('blur');

                expect(inputToolsMock.handleRequiredValidation).toHaveBeenCalled();
            });
        });

        describe('Postal Code Input', () => {
            const name = 'postalCode';

            it('should set postal code on valid input change', () => {
                const value = '54321';
                const target = { name, value };

                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(1)
                    .simulate('change', { target });

                expect(wrapper.state(name)).toBe(value);
            });

            it('should NOT set postal code on invalid input change', () => {
                const value = 'a';
                const target = { name, value };

                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(2)
                    .simulate('change', { target });

                expect(wrapper.state(name)).toBe(user[name]);
            });

            it('should call handleRequiredValidation on blur', () => {
                wrapper.find(`.user_address_widget__inputs_location > input`)
                    .at(2)
                    .simulate('blur');

                expect(inputToolsMock.handleRequiredValidation).toHaveBeenCalled();
            });
        });

        describe('Update Address button', () => {
            it('should be enabled when required fields ARE populated', () => {
                expect(wrapper.find('button').props().disabled).toBe(false);
            });

            it('should be disabled when required fields are NOT populated', () => {
                wrapper.setState({
                    addressLine1: '',
                    city: '',
                    state: '',
                    postalCode: ''
                });

                expect(wrapper.find('button').props().disabled).toBe(true);
            });

            it('should call onSubmit prop on button click', () => {
                const {
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    postalCode,
                } = user;

                wrapper.find('button').simulate('click');

                expect(onSubmit).toHaveBeenLastCalledWith({
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    postalCode,
                });
            });
        });
    });

    describe('when isReadOnly is TRUE', () => {
        it('should render UserAddressWidget correctly', () => {
            buildWrapper(user);

            expect(wrapper).toMatchSnapshot();
        });

        it('should render UserAddressWidget with default props', () => {
            buildWrapper(defaultEmptyState);

            expect(wrapper.state()).toEqual(defaultEmptyState);
        });
    });
});
