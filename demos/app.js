angular.module('app', []);

angular.module('app').controller('mainCtrl', ['$scope', function ($scope) {

  $scope.find = function (coll, prop, val) {
    var result = [];

    for (var i = 0; i < coll.length; i++) {
      if (coll[i][prop] === val) {
        result.push(coll[i]);
      }
    }
    return result[0];
  }

}]);

angular.module('app').service('graph', function () {

  var Node = function(obj) {
    for (var key in obj) {
      this[key] = obj[key];
    }
  };

  var Link = function(obj) {
    this.id = obj.id;
    this.source = obj.source;
    this.target = obj.target;
  };

  var Graph = function() {
    this.nodes  = {};
    this.links  = {};
  }

  Graph.prototype.addNode = function (obj) {
    if (obj.id === undefined) {
      throw "Node ID required";
    } else {
      if (this.nodes[obj.id] !== undefined) {
        return this.nodes[obj.id];
      } else {
        return this.nodes[obj.id] = new Node(obj);
      }
    }
  };

  Graph.prototype.removeNode = function (nodeID) {
    var node = this.nodes[nodeID], links = this.links;
    if (node) {
      delete this.nodes[nodeID];

      for (var l in links) {
        if (links[l].source === node || links[l].target === node) {
          delete links[l];
        }
      }
    } else {
      throw "Node not found";
    }
  };

  Graph.prototype.getNodes = function () {
    var nodesArr = [];
    for (var key in this.nodes) {
      nodesArr.push(this.nodes[key]);
    }
    return nodesArr;
  };

  Graph.prototype.addLink = function(begID, endID){
    var node1, node2, lid;
    if (this.nodes[begID] && this.nodes[begID]) {
      node1 = this.nodes[begID < endID ? begID: endID];
      node2 = this.nodes[begID < endID ? endID: begID];
      lid = node1.id + '_' + node2.id;
      this.links[lid] = new Link({id: lid, source: node1, target: node2});
    } else {
      throw "Both nodes must exist in the graph";
    }
  };

  Graph.prototype.removeLink = function(begID, endID){
    var id1 = begID < endID ? begID: endID;
    var id2 = begID < endID ? endID: begID;
    if (this.links[id1 + '_' + id2]) {
      delete this.links[id1 + '_' + id2];
    } else {
      throw "Link not found";
    }
  };

  Graph.prototype.getLinks = function () {
    var linksArr = [];
    for (var key in this.links) {
      linksArr.push(this.links[key]);
    }
    return linksArr;
  };

  var create = function () {
    return new Graph();
  }

  return { create: create };

});