const ADD_POST = "ADD-POST";
const UPDATE_NEW_POST_TEXT = "UPDATE-NEW-POST-TEXT";
const ADD_PROFILE_NAME = "ADD_PROFILE_NAME";
const UPDATE_PROFILE_NAME = "UPDATE_PROFILE_NAME";

let initialState = {
  profileData: {
    name: "Teacher",
    surname: "Russo",
    email: "example@mail.com",
    password: "open",
    deepInfo: {
      gender: "Male",
      BirthDate: "11.11.1995",
      photo: "",
      education: "",
      tel: "",
    },
  },
  postsData: [
    { id: 1, message: "first post!", likesCount: 12 },
    { id: 2, message: "Give me more likes", likesCount: 23 },
    { id: 3, message: "Durofff verni stenu!!!", likesCount: 1 },
  ],
  newPostText: "Pupiiiiiiii",
  newNameText: ""
};

const profileReducer = (state_p = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 4,
        message: state_p.newPostText,
        likesCount: 0,
      };
      let stateCopy = { ...state_p };
      stateCopy.postsData = [...state_p.postsData];
      stateCopy.postsData.push(newPost);
      stateCopy.newPostText = "";
      return stateCopy;
    }
    case UPDATE_NEW_POST_TEXT: {
      let stateCopy = { ...state_p };
      stateCopy.newPostText = action.text;
      return stateCopy;
    }
    case ADD_PROFILE_NAME: {
      let name = state_p.newNameText;
      return {
        ...state_p,
        profileData: { ...state_p.profileData, name },
        newNameText: ""
      };
    }
    case UPDATE_PROFILE_NAME: {
      return {
        ...state_p,
        newNameText: action.name
      };
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

export const addProfileDataAC = () => ({ type: ADD_PROFILE_NAME });

export const updateProfileNameAC = (newProfileData) => ({
  type: UPDATE_PROFILE_NAME,
  name: newProfileData,
});

export default profileReducer;
