import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
    DiagramWidget,
    DefaultPortModel,
} from "storm-react-diagrams";

import { modalType } from '../../../modal/types';
import { updateSourceType } from '../../../common/types';

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
        if (e.target.className && e.target.className.indexOf('srd-default') !== -1) {
            const pageKey = e.target.pageKey

            props.showModal(modalType.showPage, {
                pageKey,
                path: [pageKey],
                updateSource: updateSourceType.repo,
                boardType,
            })
        }
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
    console.log({list, props})

	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	//2) setup the diagram model
    var model = new DiagramModel();
    
    const handleSelection = (e) => {
        console.log({e})
    }

    list.forEach(item => {
        var node = new DefaultNodeModel(item.title, '#ddd')
        node.addInPort('in')
        node.addInPort('in')
        node.addOutPort('out')
        node.setPosition(500, 600)
        node.addListener({
            selectionChanged: handleSelection,
        })
        
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