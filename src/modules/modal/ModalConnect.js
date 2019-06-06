import { useDispatch } from 'react-redux'

import { usePath } from '../hooks/Hooks';
import { updateGeneral } from '../page/PageReducer'
import { showModal, popModalTo, updateTopModal } from './ModalReducer'

import ModalKeys from './ModalKeys'

export default function ModalConnect({item, index}) {
    const dispatch = useDispatch()
    
    //create temporary props that are not stored in redux
    let renderProps = {}
    const { path } = item
    
    //some APIs
    renderProps.showModal = (k, p) => dispatch(showModal(k, p))
    renderProps.popModalBy = (pops) => dispatch(popModalTo(index - pops))
    renderProps.close = () => dispatch(popModalTo(index - 1))

    renderProps.setWorkspace = (value, path) => dispatch(updateTopModal(path || ['attach'], value))
    renderProps.updatePage = (path, value) => dispatch(updateGeneral({path, update: value}))

    if (!path) {
        console.warn('this modal has no path.')
        return ModalKeys({...item, ...renderProps})
    }

    renderProps.slate   = usePath(path);
    renderProps.update  = (value) => dispatch(updateGeneral({path, update: value}))

    return ModalKeys({...item, ...renderProps})
}