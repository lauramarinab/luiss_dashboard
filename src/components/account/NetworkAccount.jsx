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
    networkGraphs: [],
    isLoading: true,
  };

  componentDidMount() {
    Api.getAllNetworksData().then(res => {
      const networkAccount = res[0];
      const networkCompetitor = res[1];
      const graphNetworkAccount = this.createNetwork(
        networkAccount.type,
        networkAccount.data
      );
      const graphNetworkCompetitor = this.createNetwork(
        networkCompetitor.type,
        networkCompetitor.data
      );

      this.setState({
        isLoading: false,
        networkGraphs: [graphNetworkAccount, graphNetworkCompetitor],
      });
    });
  }

  createNetwork = (networkType, networkData) => {
    const data = networkData;
    const nodesProva = [];
    const edgesProva = [];
    const len = data.nodes.length;
    const len2 = data.edges.length;

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

    return {
      [networkType]: {
        edges: edgesProva,
        nodes: nodesProva,
      },
    };
  };

  render() {
    return (
      <div className="container-charts network-charts">
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && (
          <React.Fragment>
            <Chart
              chartTitle="Quali account Luiss parlano degli stessi argomenti?"
              getActivityInvolvementDates={this.getNetworkDataByDate}
              doesCalendarExist
              graphExplanation={graphExplanation[3]}
            >
              <div className="sigma">
                <Sigma
                  graph={this.state.networkGraphs[0].accountMa}
                  settings={{
                    drawEdges: true,
                    clone: false,
                    defaultNodeColor: '#ca4f24',
                    defaultLabelColor: '#ca4f24',
                    defaultEdgeColor: '#6d7eb0',
                    edgeColor: 'default',
                    zoomMin: 0.004,
                    defaultLabelHoverColor: '#ca4f24',
                    nodeHoverColor: 'default',
                    defaultNodeHoverColor: '#fff',
                    defaultEdgeHoverColor: '#3498db',
                  }}
                >
                  <RelativeSize initialSize={15} />
                  <RandomizeNodePositions />
                </Sigma>
              </div>
            </Chart>
            <Chart
              chartTitle="Quali competitors di Luiss parlano degli stessi argomenti?"
              getActivityInvolvementDates={this.getNetworkDataByDate}
              doesCalendarExist
              graphExplanation={graphExplanation[3]}
            >
              <div className="sigma">
                <Sigma
                  graph={this.state.networkGraphs[1].competitorMa}
                  settings={{
                    drawEdges: true,
                    clone: false,
                    defaultNodeColor: '#ca4f24',
                    defaultLabelColor: '#ca4f24',
                    defaultEdgeColor: '#6d7eb0',
                    edgeColor: 'default',
                    zoomMin: 0.004,
                    defaultLabelHoverColor: '#ca4f24',
                    nodeHoverColor: 'default',
                    defaultNodeHoverColor: '#fff',
                    defaultEdgeHoverColor: '#3498db',
                  }}
                >
                  <RelativeSize initialSize={15} />
                  <RandomizeNodePositions />
                </Sigma>
              </div>
            </Chart>
          </React.Fragment>
        )}
      </div>
    );
  }
}
