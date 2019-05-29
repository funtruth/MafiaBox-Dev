import { useSelector } from 'react-redux'

/*useSelector based on path instead of actual selector
    this is pretty much a dynamic selector.

    function example() {
        const state = usePath(path = [])
        ...
    }
*/

//recursive pointer function
function stateByPath(path, state, index, defaultReturn) {
    if (!state[path[index]]) return defaultReturn
    if (path.length - 1 === index) return state[path[index]]
    return stateByPath(path, state[path[index]], index + 1, defaultReturn)
}
/* @params
    path => path to state in redux, "slate"
    defaultReturn => return if nothing is found at path
*/
export default (path, defaultReturn = {}) => {
    return useSelector(state => stateByPath(path, state.page, 0, defaultReturn))
}