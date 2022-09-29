const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "INITIALIZE_BLOGS":
      state = action.data
      return state
    case "ADD_BLOG":
      return state.concat(action.data)
    case "DELETE_BLOG":
      //fix
      return state.filter((blog) => blog.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: "INITIALIZE_BLOGS",
    data: blogs,
  }
}

export const addBlog = (blog) => {
  return {
    type: "ADD_BLOG",
    data: blog,
  }
}

export const removeBlog = (blog) => {
  return {
    type: "DELETE_BLOG",
    data: blog,
  }
}

export default blogsReducer
