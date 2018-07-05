import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';

export default class HierarchiesCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }
  componentDidMount() {
    axios
      .get('http://165.227.158.131/dp/api/v155/hierarchy/twitter/ma/100')
      .then(res => {
        const risposta = res.data.apiData.hierarchy.data;
        const splittedArr = risposta.map(el => el.id.split(';'));
        console.log('splittedArr', splittedArr);

        const arrChildren = splittedArr
          .filter(el => el.length === 2)
          .map(el => ({ name: el[1] }));

        console.log('arrChildren', arrChildren);
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
        console.log(arrChildren);

        this.setState({
          data: [
            {
              name: splittedArr[0].toString(),
              children: arrChildren,
            },
          ],
        });
      });
  }

  render() {
    if (this.state.data === null) {
      return <h1>Loading...</h1>;
    }
    return (
      <div style={{ width: '100%', height: '100vh' }}>
        <Tree
          data={this.state.data}
          separation={{ siblings: 0.3, nonSiblings: 0.3 }}
          depthFactor="200"
          collapsible="true"
        />
      </div>
    );
  }
}

// const myTreeData = [
//   {
//     name: top level,
//     children: [
//       { name: 'Level 2: A', children: [{ name: 'Level 3: A', children:[{name:'Level 4: A'}] }] },
//       { name: 'Level 2: B' },
//     ],
//   },
// ];

// SECONDO METODO (ricorsivo):
// let index = 0; index < toData.length; index++
// inizio funzione

// const toData = [{ name: null, children: [] }];
// for (let index = 0; index < toData.length; index++) {
//   for (let i = 0; i < splittedArr.length; i++) {
//     let pos = 1;
//     if (splittedArr[i].length === pos) {
//       toData[index].name = splittedArr[i];
//     } else if (splittedArr[i].length === pos + 1) {
//       toData[index].children.push({ name: splittedArr[i][pos] });
//     }
//     pos += 1;
//   }
// }
// console.log('todata', toData);
