const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_USER":
      state = action.data
      return state
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: user,
  }
}

export default userReducer
