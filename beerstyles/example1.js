var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
  // init data
  var json = [
      {
        "adjacencies": [],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "ALE",
        "name": "ALE",
        "glassStyle": "Pint"
      },  {
        "adjacencies": [
            {
              "nodeTo": "ALE",
              "nodeFrom": "MILD ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "MILD ALE",
        "name": "MILD ALE",
        "glassStyle": "Pint"
      },  {
        "adjacencies": [
            {
              "nodeTo": "MILD ALE",
              "nodeFrom": "AMERICAN BROWN ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "AMERICAN BROWN ALE",
        "name": "AMERICAN BROWN ALE",
        "glassStyle": "PINT"
      },  {
        "adjacencies": [
            {
              "nodeTo": "MILD ALE",
              "nodeFrom": "ENGLISH BROWN ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "BRITISH BROWN ALE",
        "name": "BRITISH BROWN ALE",
        "glassStyle": "PINT"
      },  {
        "adjacencies": [
            {
              "nodeTo": "ALE",
              "nodeFrom": "RYE ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "RYE ALE",
        "name": "RYE ALE",
        "glassStyle": "PINT"
      },  {
        "adjacencies": [
            {
              "nodeTo": "ALE",
              "nodeFrom": "VEGETABLE ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "VEGETABLE ALE",
        "name": "VEGETABLE ALE"
      },  {
        "adjacencies": [
            {
              "nodeTo": "VEGETABLE ALE",
              "nodeFrom": "PUMPKIN ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "PUMPKIN ALE",
        "name": "PUMPKIN ALE"
      },  {
        "adjacencies": [
            {
              "nodeTo": "VEGETABLE ALE",
              "nodeFrom": "CHILE BEER",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "CHILE BEER",
        "name": "CHILE BEER",
        "glassStyle": "PINT"
      },  {
        "adjacencies": [
            {
              "nodeTo": "ALE",
              "nodeFrom": "WILD ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "WILD ALE",
        "name": "WILD ALE"
      },  {
        "adjacencies": [
            {
              "nodeTo": "WILD ALE",
              "nodeFrom": "AMERICAN WILD ALE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "AMERICAN WILD ALE",
        "name": "AMERICAN WILD ALE",
        "glassStyle": "PINT"
      },  {
        "adjacencies": [
            {
              "nodeTo": "WILD ALE",
              "nodeFrom": "LAMBIC",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "LAMBIC",
        "name": "LAMBIC"
      },  {
        "adjacencies": [
            {
              "nodeTo": "LAMBIC",
              "nodeFrom": "FARO",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "FARO",
        "name": "FARO"
      },  {
        "adjacencies": [
            {
              "nodeTo": "LAMBIC",
              "nodeFrom": "GUEUZE",
              "data": {
                "$color": "#557EAA"
              }
            }],
        "data": {
          "$color": "#C74243",
          "$type": "circle",
          "$dim": 10
        },
        "id": "GUEUZE",
        "name": "GUEUZE"
      }
  ];
  // end
  // init ForceDirected
  var fd = new $jit.ForceDirected({
    //id of the visualization container
    injectInto: 'infovis',
    //Enable zooming and panning
    //by scrolling and DnD
    Navigation: {
      enable: true,
      //Enable panning events only if we're dragging the empty
      //canvas (and not a node).
      panning: 'avoid nodes',
      zooming: 10 //zoom speed. higher is more sensible
    },
    // Change node and edge styles such as
    // color and width.
    // These properties are also set per node
    // with dollar prefixed data-properties in the
    // JSON structure.
    Node: {
      overridable: true
    },
    Edge: {
      overridable: true,
      color: '#23A4FF',
      lineWidth: 0.4
    },
    //Native canvas text styling
    Label: {
      type: labelType, //Native or HTML
      size: 10,
      style: 'bold'
    },
    //Add Tips
    Tips: {
      enable: true,
      onShow: function(tip, node) {
        console.log(node)
        //count connections
        var count = 0;
        node.eachAdjacency(function() { count++; });
        //display node info in tooltip
        tip.innerHTML = "<div class=\"tip-title\">" + node.name + "</div>"
          + "<div class=\"tip-text\"><b>connections:</b> " + count + "</div>";
      }
    },
    // Add node events
    Events: {
      enable: true,
      type: 'Native',
      //Change cursor style when hovering a node
      onMouseEnter: function() {
        fd.canvas.getElement().style.cursor = 'move';
      },
      onMouseLeave: function() {
        fd.canvas.getElement().style.cursor = '';
      },
      //Update node positions when dragged
      onDragMove: function(node, eventInfo, e) {
          var pos = eventInfo.getPos();
          node.pos.setc(pos.x, pos.y);
          fd.plot();
      },
      //Implement the same handler for touchscreens
      onTouchMove: function(node, eventInfo, e) {
        $jit.util.event.stop(e); //stop default touchmove event
        this.onDragMove(node, eventInfo, e);
      },
      //Add also a click handler to nodes
      onClick: function(node) {
        if(!node) return;
        console.log(node)
        console.log(node.name)
        console.log(node.id)
        console.log(node.glassStyle)
        // Build the right column relations list.
        // This is done by traversing the clicked node connections.
        var html = "<h4>" + node.name + "</h4><h4>Glass Style</h4><p>" + node.glassStyle + "</p><b> connections:</b><ul><li>",
            list = [];
        node.eachAdjacency(function(adj){
          list.push(adj.nodeTo.name);
        });
        //append connections information
        $jit.id('inner-details').innerHTML = html + list.join("</li><li>") + "</li></ul>";
      }
    },
    //Number of iterations for the FD algorithm
    iterations: 200,
    //Edge length
    levelDistance: 130,
    // Add text to the labels. This method is only triggered
    // on label creation and only for DOM labels (not native canvas ones).
    onCreateLabel: function(domElement, node){
      console.log(node)
      domElement.innerHTML = node.name;
      var style = domElement.style;
      style.fontSize = "0.8em";
      style.color = "#ddd";
    },
    // Change node styles when DOM labels are placed
    // or moved.
    onPlaceLabel: function(domElement, node){
      console.log(node)
      var style = domElement.style;
      var left = parseInt(style.left);
      var top = parseInt(style.top);
      var w = domElement.offsetWidth;
      style.left = (left - w / 2) + 'px';
      style.top = (top + 10) + 'px';
      style.display = '';
    }
  });
  // load JSON data.
  fd.loadJSON(json);
  // compute positions incrementally and animate.
  fd.computeIncremental({
    iter: 40,
    property: 'end',
    onStep: function(perc){
      //Log.write(perc + '% loaded...');
    },
    onComplete: function(){
      //Log.write('done');
      fd.animate({
        modes: ['linear'],
        transition: $jit.Trans.Elastic.easeOut,
        duration: 2500
      });
    }
  });
  // end
}