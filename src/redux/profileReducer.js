const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";

let initialState = {
  postsData: [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ],
  newPostText: "Pupiiiiiiii",
};

const profileReducer = (state_p = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 4,
        message: state_p.newPostText,
        likesCount: 0,
      };
      let stateCopy = { ...state_p }
      stateCopy.postsData = [ ...state_p.postsData ]
      stateCopy.postsData.push(newPost);
      stateCopy.newPostText = "";
      return stateCopy;
    }
    case UPDATE_NEW_POST_TEXT: {
      let stateCopy = { ...state_p };
      stateCopy.newPostText = action.text;
      return stateCopy;
    }
    default:
      return state_p;
  }
}

export const addPostActionCreator = () => ({ type: ADD_POST });

export const updateNewPostTextActionCreator = (postMessageUI) => ({
  type: UPDATE_NEW_POST_TEXT,
  text: postMessageUI,
});

export default profileReducer;
