import { connect } from 'react-redux'
import { showModal } from '../../ModalReducer'
import Item from './InactiveOpDraggable';

export default connect(
    null,
    {
        showModal,
    }
)(Item)