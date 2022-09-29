const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_BLOGS":
      state = action.data
      return state
    case "ADD_BLOG":
      return state.concat(action.data)
    default:
      return state
  }
}

export const addBlog = (blog) => {
  return {
    type: "ADD_BLOG",
    data: blog,
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: "INITIALIZE_BLOGS",
    data: blogs
  }
}

export default blogsReducer
