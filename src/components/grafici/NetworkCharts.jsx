import React, { Component } from 'react';
import axios from 'axios';
import Chart from './Chart';
import './../../css/chart.css';
import './../../css/Charts.css';
import arrow from './../../img/arrow.svg';
import {
  Sigma,
  EdgeShapes,
  NodeShapes,
  LoadJSON,
  LoadGEXF,
  Filter,
  ForceAtlas2,
  RelativeSize,
  NOverlap,
  NeoCypher,
  NeoGraphItemsProducers,
  RandomizeNodePositions,
  SigmaEnableWebGL,
} from 'react-sigma';
import ForceLink from 'react-sigma/lib/ForceLink';
import Dagre from 'react-sigma/lib/Dagre';
import { Object } from 'core-js';

export default class NetworkCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myGraph: null,
    };
  }
  componentDidMount() {
    axios
      .get('http://165.227.158.131/dp/api/v155/network/twitter/ma/100')
      .then(res => {
        const data = res.data.apiData.network.data;
        // {nodes:[{id:"n1", label:"Alice"}
        // {community: 0, degree: 0, id: 0, label: "luiss guido carli", strength: 0}
        const nodesProva = [];
        const edgesProva = [];
        const len = data.nodes.length;
        const len2 = data.edges.length;
        console.log('questo è data:', data);
        console.log('questo è nodesProva:', nodesProva);

        for (let i = 0; i < len; i++) {
          nodesProva.push({
            id: data.nodes[i].id.toString(),
            label: data.nodes[i].label,
          });
        }
        for (let i = 0; i < len2; i++) {
          edgesProva.push({
            id: i.toString(),
            source: data.edges[i].source.toString(),
            target: data.edges[i].target.toString(),
            label: `LABEL${i}`,
          });
        }

        this.setState({
          myGraph: {
            edges: edgesProva,
            nodes: nodesProva,
          },
          // nodes: nodesProva,
          // edges: edgesProva,
        });
      });
  }

  render() {
    // const myGraph = {
    //   nodes: [
    //     { id: '0', label: 'luiss guido carli' },
    //     { id: '1', label: 'luiss open' },
    //     { id: '2', label: 'luissuniversitypress' },
    //     { id: '3', label: 'luiss business school' },
    //     { id: '4', label: 'luiss sport' },
    //     { id: '5', label: 'luiss adoption lab' },
    //     { id: '6', label: 'luiss business school international programs' },
    //     { id: '7', label: 'milanoluisshub' },
    //     { id: '8', label: 'radioluiss.it' },
    //     { id: '9', label: 'reporternuovo' },
    //     { id: '10', label: 'luiss laureati' },
    //     { id: '11', label: 'luiss enlabs' },
    //     { id: '12', label: 'luiss sog' },
    //     { id: '13', label: 'x.ite research' },
    //     { id: '14', label: 'luiss macom' },
    //     { id: '15', label: 'esn roma luiss' },
    //   ],
    //   edges: [{ id: 'e1', source: '0', target: '1', label: 'SIIS1' }],
    // };
    // console.log('questo è mygrap nodes', myGraph.nodes);

    // const myGraph = {
    //   nodes: this.state.nodes,
    //   edges: [{ id: 'e1', source: '0', target: '1', label: 'SIIS1' }],
    // };
    const myGraph = this.state.myGraph;
    if (this.state.myGraph === null) {
      return <h1>Loading...</h1>;
    }
    return (
      <div className="container-charts">
        <Chart
          title="Quali account Luiss parlano degli stessi argomenti?"
          select={[]}
        >
          <Sigma
            graph={myGraph}
            settings={{
              drawEdges: true,
              clone: false,
              defaultLabelColor: '#ca4f24',
              defaultEdgeColor: '#3498db',
              zoomMin: 0.004,
              defaultNodeColor: '#585858',
              defaultLabelHoverColor: '#ca4f24',
              nodeHoverColor: 'default',
              defaultNodeHoverColor: '#fff',
              // defaultEdgeHoverColor: '#3498db',
            }}
          >
            <RelativeSize initialSize={15} />
            <RandomizeNodePositions />
          </Sigma>
        </Chart>
      </div>
    );
  }
}
