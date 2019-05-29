import { useDispatch } from 'react-redux'

import { usePath } from '../hooks/Hooks';
import { showDropdown, popDropdownTo } from './DropdownReducer'
import { showModal } from '../modal/ModalReducer'
import { updateGeneral } from '../page/PageReducer'

import DropdownKeys from './DropdownKeys'

export default function DropdownConnect({item, index}) {
    const dispatch = useDispatch()
    
    //create temporary props that are not stored in redux
    let renderProps = {}
    const { path, subpath, ignoreSubpath } = item
    
    //some APIs
    renderProps.showDropdown = (key, e, params) => dispatch(showDropdown(key, e, params, index, 'right'))
    renderProps.popDropdownTo = (forcedIndex) => dispatch(popDropdownTo(forcedIndex || index))
    renderProps.popDropdown = () => dispatch(popDropdownTo(index - 1))
    renderProps.showModal = (k, p) => dispatch(showModal(k, p))
    renderProps.updateGeneral = (p, u, eP) => dispatch(updateGeneral(p, u, eP))
    renderProps.updatePage = (value, extraPath=[]) => {
        if (ignoreSubpath) {
            dispatch(updateGeneral(path, value, extraPath))
        } else {
            dispatch(updateGeneral(path, value, (subpath||[]).concat(extraPath)))
        }
    }

    if (!path) console.warn('this dropdown has no path.')
    renderProps.slate   = usePath(path);
    renderProps.update  = (value) => dispatch(updateGeneral(path, value))

    return DropdownKeys({...item, ...renderProps})
}