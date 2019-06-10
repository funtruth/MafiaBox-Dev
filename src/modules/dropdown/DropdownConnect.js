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
    const { path } = item
    
    //some APIs
    renderProps.showDropdown = (key, e, params) => dispatch(showDropdown(key, e, params, index, 'right'))
    renderProps.popDropdownTo = (forcedIndex) => dispatch(popDropdownTo(forcedIndex || index))
    renderProps.showModal = (k, p) => dispatch(showModal(k, p))
    renderProps.updateGeneral = (...u) => dispatch(updateGeneral(...u))

    if (!path) {
        console.warn('this dropdown has no path.')
        return DropdownKeys({...item, ...renderProps})
    }
    
    renderProps.slate   = usePath(path);
    console.log('slate of Dropdown', {slate: renderProps.slate})
    renderProps.update  = (...u) => dispatch(updateGeneral(...(u.map(i => ({path, update: i})))))

    return DropdownKeys({...item, ...renderProps})
}