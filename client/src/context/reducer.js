export const actionType = {
    SET_USER: "SET_USER",
    SET_CURRENTSONG: "SET_CURRENTSONG",
    SET_FAVSONGS: "SET_FAVSONGS"
};

const reducer = (state, action) => {
    switch (action.type) {
        case actionType.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case actionType.SET_CURRENTSONG:
            return {
                ...state,
                currentsong: action.currentsong,
            }
        case actionType.SET_FAVSONGS:
            return {
                ...state,
                favsongs: action.favsongs,
            }
        default:
            return state;
    }
};

export default reducer;