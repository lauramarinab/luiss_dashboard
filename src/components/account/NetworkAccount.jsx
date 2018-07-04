import React, { Component } from 'react';
import axios from 'axios';
import Chart from './../grafici/Chart';
import './../../css/chart.css';
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
import Api from '../../data/apiCalls';
import Spinner from './../Spinner';
import graphExplanation from './../../data/graphExplanations.json';
import Helper from './../../helper';

export default class NetworkCharts extends Component {
  state = {
    myGraph: null,
    isLoading: true,
  };

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
          isLoading: false,
          myGraph: {
            edges: edgesProva,
            nodes: nodesProva,
          },
        });
      });
  }

  render() {
    return (
      <div className="container-charts network-charts">
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && (
          <Chart chartTitle="Quali account Luiss parlano degli stessi argomenti?">
            <div className="sigma">
              <Sigma
                graph={this.state.myGraph}
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
            </div>
          </Chart>
        )}
      </div>
    );
  }
}
