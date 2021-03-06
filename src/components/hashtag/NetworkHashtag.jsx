import React, { Component } from 'react';
import Chart from './../grafici/Chart';
import './../../css/chart.css';
import { Sigma, RelativeSize, RandomizeNodePositions } from 'react-sigma';
import Api from '../../data/apiCalls';
import Spinner from './../Spinner';
import graphExplanation from './../../data/graphExplanations.json';

export default class NetworkCharts extends Component {
  state = {
    networkGraphs: [],
    isLoading: true,
  };

  componentDidMount() {
    Api.getAllNetworksData().then(res => {
      const networkAccount = res[2];
      const networkCompetitor = res[3];
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
              chartTitle="Quali hashtag vengono citati di più negli stessi tweet di Luiss?"
              getActivityInvolvementDates={this.getNetworkDataByDate}
              doesCalendarExist
              graphExplanation={graphExplanation[3]}
            >
              <div className="sigma">
                <Sigma
                  graph={this.state.networkGraphs[0].accountHt}
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
              chartTitle="Quali hashtag vengono citati di più negli stessi tweet dei competitors di Luiss?"
              getActivityInvolvementDates={this.getNetworkDataByDate}
              doesCalendarExist
              graphExplanation={graphExplanation[3]}
            >
              <div className="sigma">
                <Sigma
                  graph={this.state.networkGraphs[1].competitorHt}
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
