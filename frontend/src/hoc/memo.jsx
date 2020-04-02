function Cards(cities) {
  if (cities) {
    return true
  }
}
function areEqual(prevProps, nextProps) {
  if (prevProps === nextProps) {
    return true
  } else {
    return false
  }
}
export default React.memo(Cards, areEqual)
