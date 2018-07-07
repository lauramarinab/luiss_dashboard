import React from 'react';
import ChordDiagram from 'react-chord-diagram';

class Chord extends React.Component {
  render() {
    return (
      <div className="chord">
        <ChordDiagram
          matrix={this.props.matrix}
          componentId={1}
          groupLabels={this.props.names}
          groupColors={['#000000', '#FFDD89', '#957244', '#F26223']}
          width={500}
          height={600}
        />
      </div>
    );
  }
}
export default Chord;
