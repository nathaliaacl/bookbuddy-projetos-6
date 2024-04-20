from flask import Flask, jsonify, request
from flask_cors import CORS
import networkx as nx
import random

app = Flask(__name__)
CORS(app)

@app.route('/graph')
def get_graph():
    vertex_count = request.args.get('vertices', default=2, type=int)  # Pega o número de vértices da URL
    G = nx.complete_graph(vertex_count)  # Gera um grafo completo como exemplo

    # Adaptação do grafo para JSON
    return jsonify({
        "nodes": [{"id": str(node)} for node in G.nodes()],
        "links": [{"source": str(u), "target": str(v)} for u, v in G.edges()]
    })

if __name__ == "__main__":
    app.run(debug=True)
