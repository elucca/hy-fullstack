
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const changeNotification = (notification) => {
  return {
    type: 'CHANGE_NOTIFICATION',
    data: notification
  }
}

export default notificationReducer