import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
    DiagramWidget,
} from "storm-react-diagrams";

import { modalType } from '../../../modal/types';
import { updateSourceType } from '../../../common/types';

import {
    getPageKey,
} from '../common/arrows'

import {
    showModal,
} from '../../../modal/ModalReducer'

export default connect(
    state => ({
        pageMap: state.page.pageMap,
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
    }
)((props) => {
    const { pageMap, pageRepo, boardType, storyKey } = props

    const handleClick = e => {
        const pageKey = getPageKey(e.target)
        if (!pageKey) return;

        props.showModal(modalType.showPage, {
            pageKey,
            path: [pageKey],
            updateSource: updateSourceType.repo,
            boardType,
        })
    }

    useEffect(() => {
        console.log("mounting")
        window.addEventListener('click', handleClick)
        return () => {
            window.removeEventListener('click', handleClick)
        }
    }, [])

    //fetch the list
    const list = (pageMap[storyKey]||[]).map(pageKey => pageRepo[pageKey])

	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	//2) setup the diagram model
    var model = new DiagramModel();

    list.forEach(item => {
        var node = new DefaultNodeModel(item.title, '#ddd', item.pageKey)
        node.addInPort('in')
        node.addInPort('in')
        node.addOutPort('out')
        node.setPosition(500, 600)
        
        model.addNode(node)
    })

	//5) load model into engine
    engine.setDiagramModel(model);
    
    const config = {
        maxNumberPointsPerLink: 0,
    }

	//6) render the diagram!
	return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} {...config}/>;
});