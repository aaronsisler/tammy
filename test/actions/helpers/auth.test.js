import { login, logout, } from 'Actions/helpers/auth';

describe('Auth Helper Actions', () => {
    describe('login() method', () => {
        it(`should setup 'login' action object`, () => {
            const uid = '123ABC';
            const action = login(uid);

            expect(action).toEqual({
                type: 'LOGIN',
                uid
            })
        })
    })

    describe('logout() method', () => {
        it(`should setup 'logout' action object`, () => {
            const action = logout();

            expect(action).toEqual({
                type: 'LOGOUT',
            })
        })
    })
})
