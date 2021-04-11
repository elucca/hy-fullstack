
const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const changeNotification = (filter) => {
  return {
    type: 'CHANGE_NOTIFICATION',
    data: filter
  }
}

export default notificationReducer