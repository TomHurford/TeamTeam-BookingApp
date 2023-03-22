import { getToken, setToken, removeToken, refreshAuthToken } from "../utils/jwt";
// Unit test for jwt.js
test('Returns null if no token is set', () => {
    expect(getToken()).toBeNull();
});

test('Returns token if token is set', () => {
    setToken('token');
    expect(getToken()).toBe('token');
});

test('Returns null if token is removed', () => {
    setToken('token');
    removeToken();
    expect(getToken()).toBeNull();
});