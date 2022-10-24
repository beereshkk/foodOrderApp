const intialState = {};

const LoginReducer = (state = intialState, action) => {
  console.log("inside reducer", action.payload);
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...action.payload };
    }
    case "USER_LOGOUT": {
      return {};
    }
    case "GET_USER": {
      return { ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
