import React, { Component } from 'react';
import ChordDiagram from 'react-chord-diagram';
import axios from 'axios';

class Chord extends React.Component {
  state = {
    data: '',
  };

  ProcessData() {
    if (
      this.state.oldData !== this.state.data &&
      this.state.data !== undefined
    ) {
      this.matrix = [];
      let data = this.state.data;
      data = Object.values(data);
      const singleList = [];
      let el;
      for (let i = 0; i < data.length; i++) {
        this.matrix.push([]);
        for (let j = 0; j < data[i].length; j++) {
          el = null;
          const tempel = singleList.find(el => {
            if (el === data[i][j].source || el === data[i][j].target) {
              return el;
            }
          });
          if (tempel !== undefined) {
            el = tempel;
          }
          if (el === null) {
            singleList.push(data[i][j].source);
          } else {
            el = null;
          }
        }
      }
      for (let i = 0; i < this.matrix.length; i++) {
        for (let j = 0; j < this.matrix.length; j++) {
          this.matrix[i].push(0);
        }
      }
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          const source = singleList.findIndex(el => {
            if (el === data[i][j].source) {
              return true;
            }
            return false;
          });
          const target = singleList.findIndex(el => {
            if (el === data[i][j].target) {
              return true;
            }
            return false;
          });
          if (
            target !== undefined &&
            source !== undefined &&
            source >= 0 &&
            target >= 0
          ) {
            this.matrix[source][target] =
              this.matrix[source][target] + data[i][j].frequency;
          }
        }
      }
      this.setState({
        names: singleList,
      });
    }
  }

  componentDidUpdate() {
    if (
      this.state.data !== undefined &&
      this.state.data !== this.state.oldData
    ) {
      this.setState({
        oldData: this.state.data,
      });
      this.ProcessData();
    }
  }

  componentDidMount() {
    axios
      .get('http://165.227.158.131/dp/api/v155/chord/twitter/ma/100')
      .then(data => {
        console.log(data);
        this.setState({ data: data.data.apiData.chord.data });
      });
  }

  render() {
    return this.data === '' ? null : (
      <div className="grafico__container grafico__chord grafico__torta">
        <ChordDiagram
          matrix={this.matrix}
          componentId={1}
          groupLabels={this.state.names}
          groupColors={['#000000', '#FFDD89', '#957244', '#F26223']}
          width={500}
          height={500}
        />
      </div>
    );
  }
}
export default Chord;
