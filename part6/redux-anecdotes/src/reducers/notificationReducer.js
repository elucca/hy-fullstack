
const initialState = 'Notification'

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export default notificationReducer