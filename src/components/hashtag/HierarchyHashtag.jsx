import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import Chart from './../grafici/Chart';
import './../../css/chart.css';
import Spinner from './../Spinner';
import Api from '../../data/apiCalls';

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

    const arrChildren = splittedArr
      .filter(el => el.length === 2)
      .map(el => ({ name: el[1] }));

    const nephArr = [];
    for (let i = 0; i < splittedArr.length; i++) {
      for (let pos = 2; pos < splittedArr[i].length; pos++) {
        if (splittedArr[i][pos]) {
          for (let y = 0; y < arrChildren.length; y++) {
            if (arrChildren[y].name === splittedArr[i][pos - 1]) {
              nephArr.push({ name: splittedArr[i][pos] });
              arrChildren[y].children = nephArr;
            }
          }
        }
      }
    }

    return {
      [hierarchiesType]: [
        {
          name: splittedArr[0].toString(),
          children: arrChildren,
        },
      ],
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
            <Chart chartTitle="Lorem ipsum?">
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyTweetGraphs[0]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  initialDepth={1}
                  translate={{ x: 450, y: 100 }}
                  zoom={0.7}
                  pathFun="diagonal"
                  depthFactor="150"
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
            <Chart chartTitle="Lorem ipsum?">
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyTweetGraphs[1]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  initialDepth={1}
                  translate={{ x: 450, y: 100 }}
                  zoom={0.7}
                  pathFun="elbow"
                  depthFactor="150"
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
            <Chart chartTitle="Lorem ipsum?">
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyTweetGraphs[2]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  initialDepth={1}
                  translate={{ x: 450, y: 100 }}
                  zoom={0.7}
                  pathFun="elbow"
                  depthFactor="150"
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
