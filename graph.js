/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    for (let adjacent of vertex.adjacent) {
      this.removeEdge(vertex, adjacent);
    }

    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start, values = [], seen = new Set([start])) {
    values.push(start.value);

    for (let adjacent of start.adjacent) {
      if (!seen.has(adjacent)) {
        seen.add(adjacent);
        this.depthFirstSearch(adjacent, values, seen);
      }
    }

    return values;
  }

  /** traverse graph with BFS and returns array of Node values */
  breadthFirstSearch(start) {
    const visitQueue = [start];
    const seen = new Set(visitQueue);

    const visited = [];

    while (visitQueue.length) {
      const node = visitQueue.shift();

      visited.push(node.value);

      for (const adj of node.adjacent) {
        if (!seen.has(adj)) {
          seen.add(adj);
          visitQueue.push(adj);
        }
      }
    }

    return visited;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end) {
    const startState = {
      node: start,
      distance: 0,
    };

    const visitQueue = [startState];
    const seen = new Set([start]);

    while (visitQueue.length) {
      const { node, distance } = visitQueue.shift();

      if (node === end) {
        return distance;
      }

      for (const adj of node.adjacent) {
        if (!seen.has(adj)) {
          seen.add(adj);
          visitQueue.push({ node: adj, distance: distance + 1 });
        }
      }
    }

    return undefined;
  }
}

module.exports = { Graph, Node };
