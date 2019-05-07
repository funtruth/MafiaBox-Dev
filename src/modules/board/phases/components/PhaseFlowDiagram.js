import React, { useState, useEffect } from 'react'
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
    showModal,
} from '../../../modal/ModalReducer'
import {
    updateRepo,
} from '../../../page/PageReducer'

const get = (page) => (page && page.phaseMap) || []

export default connect(
    state => ({
        modeRepo: state.page.modeRepo,
        pageRepo: state.page.pageRepo,
    }),
    {
        showModal,
        updateRepo,
    }
)((props) => {
    const { modeRepo, pageRepo, boardType, modeKey } = props
    
    //action follows BaseAction props from storm-react-diagrams
    const mouseDown = action => {
        //check if a proper item is selected & get pageKey
        if (action.selectionModels && action.selectionModels[0].model.pageKey) {
            const pageKey = action.selectionModels[0].model.pageKey

            //function exists inside mouseDown so we have access to original action.XY
            const mouseUp = e => {
                //if item has moved, just send an update on XY
                if (e.pageX !== action.mouseX || e.pageY !== action.mouseY) {
                    props.updateRepo([pageKey], {
                        diagramXY: {
                            x: action.selectionModels[0].initialX + e.pageX - action.mouseX,
                            y: action.selectionModels[0].initialY + e.pageY - action.mouseY,
                        }
                    })
                //if item has not moved, count as user click
                } else {
                    props.showModal(modalType.showPage, {
                        pageKey,
                        path: [pageKey],
                        updateSource: updateSourceType.repo,
                        boardType,
                    })
                }
                
                //remove listener
                window.removeEventListener('click', mouseUp)
            }
    
            //add listener for mouseup
            window.addEventListener('click', mouseUp)
            return true;
        } else return true;
    }
    
    //fetch the list
    const phaseMap = get(modeRepo[modeKey])
    const [list, setList] = useState(phaseMap.map(pageKey => pageRepo[pageKey]))
    useEffect(() => {
        setList(phaseMap.map(pageKey => pageRepo[pageKey]))
    }, [pageRepo])

    //setup the diagram engine
    const [engine, setEngine] = useState("")
    useEffect(() => {
        var engineMount = new DiagramEngine();
        engineMount.installDefaultFactories();

        var model = new DiagramModel();

        //setup all nodes
        list.forEach(item => {
            var node = new DefaultNodeModel(item.title, 'rgba(40, 43, 48, 1)', item.pageKey)
            node.addInPort('in')
            node.addOutPort('out')
            if (item.diagramXY) {
                node.setPosition(item.diagramXY.x, item.diagramXY.y)
            } else {
                node.setPosition(100, 100)
            }
            model.addNode(node)
        })

        //load model into engine
        engineMount.setDiagramModel(model);
        setEngine(engineMount)
    }, [list])
    
    if (!engine) return null;
    return (
        <DiagramWidget
            className="srd-demo-canvas"
            diagramEngine={engine}
            maxNumberPointsPerLink={2}
            smartRouting={true}
            actionStartedFiring={mouseDown}
        />
    )
});