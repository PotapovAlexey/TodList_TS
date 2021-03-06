import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
    const startState = {name: 'Dimych', age: 20, childrenCount: 2};

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = {name: 'Dimych', age: 20, childrenCount: 2};
    const endState = userReducer(startState, {type: "INCREMENT_CHILDREN-COUNT"})
    expect(endState.age).toBe(20);
    expect(endState.childrenCount).toBe(3);
});
test("user reducer should change name", () => {
    const startState = {name: 'Dimych', age: 20, childrenCount: 2};
    const newName = "Alex"
    const endState = userReducer(startState, {type: "CHANGE-NAME", newName: newName})
    expect(endState.name).toBe(newName);
})
