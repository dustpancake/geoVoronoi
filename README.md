# geoVoronoi
JS Template Webpage for creating Voronoi plots using geographic data; created for data-exploratory use.

## Setup
Setup is as simple as 
```
npm i .
```

## Usage
Edit the `src/index.js` file to interpret the data you wish to use, e.g. some `.csv` file. The data to represent should be included in the `build/assets` folder.

Then either start a `webpack` development server with
```
npm run dev
```
or package a `dist` using
```
npm run build
```
and share on a file server.