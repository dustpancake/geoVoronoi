import { Delaunay } from "d3-delaunay";

export { unpack, describeData };

function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
}

function describeData(rows, ppName, cvals, dict, scl) {

    var lons = unpack(rows, 'lon'), 
        lats = unpack(rows, 'lat'), 
        names = unpack(rows, 'name');


    var fmtDicts = []
    dict.forEach((item) => {
        var fDic = "";
        Object.keys(JSON.parse(item)).map((i, ind) => {
            fDic += `<br>${i}: ${String(item[i])}`;
        });

        fmtDicts.push(fDic);
    });

    const dataTemplate = { 
        type: 'scattermapbox', 
        lon: lons, 
        lat: lats, 
        hoverinfor: names,
        mode: 'markers',
        marker: {
            color: cvals,
            symbol: 'circle',
            colorscale: scl,
            cmin: 0,
            cmax : 1.0,
            opacity: cvals.map((i) => i == 'NA' ? 0.2 : 0.7),
            size: cvals.map((i) => i == 'NA' ? 3 : 8),
            line: {
                color: 'black',
                width: 10
            }
        },
        name: ppName,
        text: names.map((i, ind) => `${i}${fmtDicts[ind]}`)
    };

    const voroTemplate = {
        type: 'scattermapbox',
        fill: 'toself',
        mode: 'lines',
        hoverinfo: 'skip',
        name: `${ppName} Voronoi`
    };

    var points = lats.map((i, ind) => [lons[ind], i]);

    const delaunay = Delaunay.from(points);
    const voronoi = delaunay.voronoi([-180, -90, 180, 90]);

    var cDat = {};
    var tLon = [], tLat = [];

    var k = 0;
    for (var i of voronoi.cellPolygons()) {
        var cval = cvals[k++];
        var color = 'rgb(255, 255, 255)';    // default colour
        if (cval != 'NA') {
            color = scl.reduce(function(p, c) {
                return (Math.abs(c[0] - cval) < Math.abs(p[0] - cval) ? c : p);
            })[1];  // first index is the colour string
        }

        i.forEach(j => {
            tLon.push(j[0]);
            tLat.push(j[1]);
        });

        if (color in cDat) {
            cDat[color].lon = cDat[color].lon.concat(tLon);
            cDat[color].lat = cDat[color].lat.concat(tLat);
        } else {
            cDat[color] = {
                lon: tLon,
                lat: tLat
            };
        }

        cDat[color].lon.push(null);
        cDat[color].lat.push(null);

        tLon = []; tLat = [];
    }

    var outData = [{...dataTemplate}];

    Object.keys(cDat).forEach((i, ind) => {
        var prop = cDat[i];
        outData.push({ ...voroTemplate,
            lon: prop.lon,
            lat: prop.lat,
            fillcolor: 
                'rgb(255, 255, 255)' == i ? 'rgba(0, 0, 0, 0)' : i.replace('rgb', 'rgba').replace(')', ',0.6)'),
            opactiy: 0.5,
            line: {
                color: 'rgba(120,120,120,0.4)',
                width: 1
            },
            legendgroup: `${ppName}vor`,
            showlegend: ind == 0
        });
    });
    return outData;
}