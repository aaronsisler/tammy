const positionsFilterReducerDefaultState =
{
    text: '',
};

const positionsFilterReducer = (state = positionsFilterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_POSITIONS_TEXT_FILTER':
            return {
                ...state,
                text: action.text
            };
        default:
            return state;
    }
};

export default positionsFilterReducer;
