const ADD_POST = "ADD-POST";

let initialState = {

};

const fileReducer = (state_f = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 4,
        message: state_f.newPostText,
        likesCount: 0,
      };
      let stateCopy = { ...state_f };
      stateCopy.postsData = [...state_f.postsData];
      stateCopy.postsData.push(newPost);
      stateCopy.newPostText = "";
      return stateCopy;
    }
    default:
      return state_f;
  }
};

export default fileReducer;
