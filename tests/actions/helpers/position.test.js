import { setPosition, clearPosition, } from '../../../src/actions/helpers/position';
import positions from '../../fixtures/positions';

describe('Position Action Helpers', () => {
    describe('setPosition() method', () => {
        it(`should setup 'set position' action object`, () => {
            const [position] = positions;
            const action = setPosition(position);

            expect(action).toEqual({
                type: 'SET_POSITION',
                position
            })
        })
    })

    describe('clearPosition() method', () => {
        it(`should setup 'clear position' action object`, () => {
            const action = clearPosition();

            expect(action).toEqual({
                type: 'CLEAR_POSITION',
            })
        })
    })
})
