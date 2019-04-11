import React from 'react'
import './storm.css'
import {
	DiagramEngine,
	DiagramModel,
	DefaultNodeModel,
    DiagramWidget,
} from "storm-react-diagrams";

const list = [
    {
        title: 'node 1',
        color: "rgb(40, 43, 48)",
        x: 100,
        y: 100,
    },
    {
        title: 'node 2',
        color: "rgb(40, 43, 48)",
        x: 400,
        y: 100,
    },
]

export default () => {
	//1) setup the diagram engine
	var engine = new DiagramEngine();
	engine.installDefaultFactories();

	//2) setup the diagram model
	var model = new DiagramModel();

    list.forEach(item => {
        var node = new DefaultNodeModel(item.title, item.color)
        node.addInPort('in')
        node.addInPort('in')
        node.addInPort('in')
        node.addInPort('in')
        node.addOutPort('out')
        node.setPosition(item.x, item.y)
        model.addNode(node)
    })

	//5) load model into engine
	engine.setDiagramModel(model);

	//6) render the diagram!
	return <DiagramWidget className="srd-demo-canvas" diagramEngine={engine} />;
};