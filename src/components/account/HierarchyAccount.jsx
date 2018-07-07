import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import Chart from './../grafici/Chart';
import './../../css/chart.css';
import Spinner from './../Spinner';
import Api from '../../data/apiCalls';

export default class HierarchyAccount extends Component {
  state = {
    hierarchyGraphs: [[{}]],
    isLoading: true,
  };

  componentDidMount() {
    Api.getAllHierarchiesData().then(res => {
      const hierarchyAccount = res[0];
      const hierarchyPersonalità = res[1];
      const hierarchyCompetitors = res[2];

      const graphHierarchyAccount = this.createHierarchies(
        'hierarchyAccount',
        hierarchyAccount.data
      );
      const graphHierarchyPersonalità = this.createHierarchies(
        'hierarchyPersonalità',
        hierarchyPersonalità.data
      );
      const graphHierarchyCompetitor = this.createHierarchies(
        'hierarchyCompetitors',
        hierarchyCompetitors.data
      );

      this.setState({
        hierarchyGraphs: [
          graphHierarchyAccount.hierarchyAccount,
          graphHierarchyPersonalità.hierarchyPersonalità,
          graphHierarchyCompetitor.hierarchyCompetitors,
        ],
        isLoading: false,
      });
      console.log(this.state.hierarchyGraphs[1]);
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

  handleClick(nodeObj, cont) {
    if (!cont || nodeObj._collapsed) return;
    const myRef = this.refs.myRef;
    const parentObj = nodeObj.parent;
    if (parentObj && myRef) {
      const nodesToBeCollapsed = parentObj.children.filter(
        c => c.id !== nodeObj.id
      );
      nodesToBeCollapsed.map((ndObj, index) => {
        if (!ndObj._collapsed) myRef.handleNodeToggle(ndObj.id, false);
      });
    }
  }

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
            <Chart chartTitle="Quali account Luiss hanno utilizzato lo stesso hashtag?">
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyGraphs[0]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  initialDepth={1}
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
            <Chart chartTitle="Chi nel mondo Luiss ha utilizzato lo stesso hashtag?">
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyGraphs[1]}
                  initialDepth={1}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  translate={{ x: 450, y: 100 }}
                  zoom={0.7}
                  pathFun="elbow"
                  depthFactor="200"
                  collapsible
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
            <Chart chartTitle="Quali competitors di Luiss hanno utilizzato lo stesso hashtag?">
              <div className="tree__container">
                <Tree
                  data={this.state.hierarchyGraphs[2]}
                  separation={{ siblings: 0.4, nonSiblings: 0.25 }}
                  initialDepth={1}
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
