import Plotly from 'plotly.js/dist/plotly';
import { unpack, describeData } from './geoVoronoi';

/**

EXAMPLE CODE: put your CSV file in build/assets

Plotly.d3.csv('./assets/test.csv', function(err, rows){

    // colour scale
    var scl = [[0,'rgb(230, 255, 230)'],[0.35,'rgb(205, 255, 204)'],[0.5,'rgb(153, 255, 153)'], [0.6,'rgb(102, 255, 102)'],[0.7,'rgb(0, 255, 0)'],[1,'rgb(0, 204, 0)']];
    
    var data = [];
    data = data.concat(
        describeData( 
            rows,
            'Some Data', 
            unpack(rows, 'Color Value'),
            unpack(rows, 'Additional Key-Value pairs'),
            scl,
        ),
        ...
    );

    var layout = {
        title: 'Voronoi Plot',
        colorbar: true,
        height: window.innerHeight,
        width: window.innerWidth,

        mapbox: { style: "open-street-map", zoom: 3 }
    };

    Plotly.newPlot("plotlyDiv", data, layout, {showLink: false});
});

**/
