import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'shoes',
        amount: 59.99,
        date: new Date('2024-12-26')
    },
    {
        id: 'e2',
        description: 'trousers',
        amount: 99.24,
        date: new Date('2024-12-12')
    },
    {
        id: 'e3',
        description: 'bananas',
        amount: 5.99,
        date: new Date('2023-10-1')
    },
    {
        id: 'e4',
        description: 'Book',
        amount: 14.90,
        date: new Date('2024-2-9')
    },
    {
        id: 'e5',
        description: 'Apple',
        amount: 100.11,
        date: new Date('2023-10-6')
    },
    {
        id: 'e6',
        description: 'Bottle',
        amount: 20.678,
        date: new Date('2024-12-30')
    },
    {
        id: 'e7',
        description: 'Belt',
        amount: 50.203,
        date: new Date('2024-12-24')
    },
    {
        id: 'e8',
        description: 'Cake',
        amount: 250.32,
        date: new Date('2023-9-8')
    },
    {
        id: 'e9',
        description: 'Tea',
        amount: 15.2,
        date: new Date('2024-12-20')
    },
    {
        id: 'e10',
        description: 'Mazza',
        amount: 230.45,
        date: new Date('2024-11-28')
    },

];

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description ,amount ,date }) => {},
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id );
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpenseContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });
    }
    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }
    function updateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: expenseData} });
    }

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
    };

    return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
}

export default ExpenseContextProvider;