const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

let clearNotification
export const changeNotification = (notification, duration) => {
  return async dispatch => {
    window.clearTimeout(clearNotification)

    dispatch({
      type: 'CHANGE_NOTIFICATION',
      data: notification,
    })

    clearNotification = setTimeout(() => {
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        data: '',
      })
    }, duration)
  }
}

export default notificationReducer
