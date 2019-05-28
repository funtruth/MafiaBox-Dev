import { useSelector } from 'react-redux'

/*useSelector based on path instead of actual selector
    function example() {
        const state = usePath(path = [])
        ...
    }
*/

//recursive pointer function
function stateByPath(path, state, index=0) {
    if (!state[path[index]]) return {}
    if (path.length - 1 === index) return state[path[index]]
    return stateByPath(path, state[path[index]], index + 1)
}

export default (path) => {
    return useSelector(state => stateByPath(path, state.page))
}