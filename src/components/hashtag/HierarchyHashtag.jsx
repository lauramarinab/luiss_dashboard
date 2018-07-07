import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import Chart from './../grafici/Chart';
import './../../css/chart.css';
import Spinner from './../Spinner';
import Api from '../../data/apiCalls';
import graphExplanation from './../../data/graphExplanations.json';

export default class HierarchyHashtag extends Component {
  state = {
    hierarchyTweetGraphs: [[{}]],
    isLoading: true,
  };

  componentDidMount() {
    Api.getAllHierarchiesData().then(res => {
      const hierarchyAccountTweet = res[3];
      const hierarchyPersonalitàTweet = res[4];
      const hierarchyCompetitorsTweet = res[5];

      const graphHierarchyAccountTweet = this.createHierarchies(
        'hierarchyAccountTweet',
        hierarchyAccountTweet.data
      );
      const graphHierarchyPersonalitàTweet = this.createHierarchies(
        'hierarchyPersonalitàTweet',
        hierarchyPersonalitàTweet.data
      );
      const graphHierarchyCompetitorsTweet = this.createHierarchies(
        'hierarchyCompetitorsTweet',
        hierarchyCompetitorsTweet.data
      );

      this.setState({
        hierarchyTweetGraphs: [
          graphHierarchyAccountTweet.hierarchyAccountTweet,
          graphHierarchyPersonalitàTweet.hierarchyPersonalitàTweet,
          graphHierarchyCompetitorsTweet.hierarchyCompetitorsTweet,
        ],
        isLoading: false,
      });

      console.log(this.state.hierarchyTweetGraphs[0]);
    });
  }

  createHierarchies = (hierarchiesType, hierarchiesData) => {
    const data = hierarchiesData;
    const splittedArr = data.map(el => el.id.split(';'));

    const tree = [];
    let childrenList = null;

    function addChildren(childrenList, element) {
      childrenList.push({ name: element, children: [] });
    }
    splittedArr.forEach(element => {
      childrenList = findChildrenList(element);
      const name = element.slice(-1)[0];
      addChildren(childrenList, name);
    });

    function findChildrenList(element) {
      const path = element.slice(0, -1);
      let subtree = tree;
      for (let i = 0; i < path.length; i++) {
        for (let j = 0; j < subtree.length; j++) {
          if (subtree[j].name === path[i]) {
            subtree = subtree[j].children;
            break;
          }
        }
      }
      return subtree;
    }

    return {
      [hierarchiesType]: tree,
    };
  };

  render() {
    const svgShape = {
      shape: 'circle',
      shapeProps: {
        width: 20,
        height: 20,
        r: 10,
        x: -10,
        y: -10,
        // fill: '#ee6f44',
      },
    };
    return (
      <div className="container-charts network-charts">
        {this.state.isLoading && <Spinner />}
        {!this.state.isLoading && (
          <React.Fragment>
            <Chart
              chartTitle="Quali hashtag vengono citati di più negli stessi tweet di Luiss?"
              graphExplanation={graphExplanation[3]}
            >
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyTweetGraphs[0]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  // initialDepth={1}
                  translate={{ x: 450, y: 100 }}
                  zoom={0.7}
                  pathFun="diagonal"
                  depthFactor="200"
                  collapsible="true"
                  nodeSize={{ x: 100, y: 160 }}
                  textLayout={{
                    textAnchor: 'end',
                    x: -10,
                    y: 15,
                    transform: 'rotate(-45)',
                  }}
                  nodeSvgShape={svgShape}
                  orientation="vertical"
                />
              </div>
            </Chart>
            <Chart
              chartTitle="Quali hashtag vengono citati di più dalle personalità intorno al mondo Luiss?"
              graphExplanation={graphExplanation[3]}
            >
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyTweetGraphs[1]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  // initialDepth={1}
                  translate={{ x: 450, y: 100 }}
                  zoom={0.7}
                  pathFun="elbow"
                  depthFactor="200"
                  collapsible="true"
                  nodeSize={{ x: 100, y: 160 }}
                  textLayout={{
                    textAnchor: 'end',
                    x: -10,
                    y: 15,
                    transform: 'rotate(-45)',
                  }}
                  nodeSvgShape={svgShape}
                  orientation="vertical"
                />
              </div>
            </Chart>
            <Chart
              chartTitle="Quali hashtag vengono citati di più negli stessi tweet dei competitors di Luiss?"
              graphExplanation={graphExplanation[3]}
            >
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyTweetGraphs[2]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  // initialDepth={1}
                  translate={{ x: 450, y: 100 }}
                  zoom={0.7}
                  pathFun="elbow"
                  depthFactor="200"
                  collapsible="true"
                  nodeSize={{ x: 100, y: 160 }}
                  textLayout={{
                    textAnchor: 'end',
                    x: -10,
                    y: 15,
                    transform: 'rotate(-45)',
                  }}
                  nodeSvgShape={svgShape}
                  orientation="vertical"
                />
              </div>
            </Chart>
          </React.Fragment>
        )}
      </div>
    );
  }
}
