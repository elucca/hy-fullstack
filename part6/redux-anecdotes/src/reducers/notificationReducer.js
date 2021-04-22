const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'CHANGE_NOTIFICATION':
      return action.data
    default:
      return state
  }
}

export const changeNotification = (notification, duration) => {
  return async dispatch => {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      data: notification,
    })
    await sleep(duration)
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      data: '',
    })
  }
}

const sleep = duration => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

export default notificationReducer
