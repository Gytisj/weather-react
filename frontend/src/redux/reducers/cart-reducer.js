export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload
    case 'ADD_TO_CART_DUPLICATE_ITEM':
      return action.payload
    case 'REMOVE_FROM_CART_DUPLICATE_ITEM':
      return action.payload
    case 'REMOVE_FROM_CART':
      return action.payload
    default:
      return state
  }
}
