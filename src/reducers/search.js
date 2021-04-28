export const initialState = {
  searchTerms: []
};

const searchTerm = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_SEARCH_TERMS":
      return {
        ...state,
        searchTerms: [...state.searchTerms, action.searchTerm]
      };
    default:
      return state;
  }
};

export default searchTerm;
