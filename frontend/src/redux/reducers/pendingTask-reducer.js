export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_PRODUCT':
      return [...state, action.payload]
    case 'LOAD_PRODUCTS':
      return action.payload
    default:
      return state
  }
}
