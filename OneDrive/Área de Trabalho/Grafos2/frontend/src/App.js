import React, { useState } from 'react';
import './App.css';
import { ForceGraph2D } from 'react-force-graph';

function App() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [vertexCount, setVertexCount] = useState('');

  const fetchGraph = () => {
    fetch(`http://localhost:5000/graph?vertices=${vertexCount}`)
      .then(response => response.json())
      .then(data => {
        setGraphData({
          nodes: data.nodes.map(node => ({ id: node.id, name: node.id })),
          links: data.links.map(link => ({ source: link.source, target: link.target })),
        });
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1 className="text-3xl font-bold text-white mt-4 mb-2">Gerador de Grafos</h1>
        <input
          type="number"
          value={vertexCount}
          onChange={e => setVertexCount(e.target.value)}
          placeholder="Enter number of vertices"
          className="mt-1 block w-1/6 px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />

        <button onClick={fetchGraph} className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-base py-1 px-2 rounded my-2">
          Generate Graph
        </button>

        {/* <ForceGraph2D
          graphData={graphData}
          nodeLabel="id"
          nodeAutoColorBy="group"
          linkDirectionalParticles="value"
        /> */}
        <ForceGraph2D
          graphData={graphData}
          nodeLabel="id"
          nodeAutoColorBy="group"
          linkDirectionalParticles="value"
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 12 / globalScale;  
            ctx.font = `${fontSize}px Sans-Serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = node.color || 'red'; 
            // Desenha o nó como um círculo
            ctx.beginPath();
            ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.fill();
            // Desenha o texto (ID do nó) no centro do círculo
            ctx.fillStyle = 'black'; 
            ctx.fillText(label, node.x, node.y);
          }}
        />
      </header>
    </div>
  );
}

export default App;
