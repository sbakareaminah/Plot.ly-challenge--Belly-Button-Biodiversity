populateTestSubjects();
showData();

function populateTestSubjects() {
    d3.json('samples.json').then(data => {
        var { names } = data;

        names.forEach(name => {
            d3.select('select').append('option').text(name);
        });
    });
};

function showData() {
    d3.json('samples.json').then(data => {
        var { metadata, samples } = data;
        var selection = d3.select('select').property('value');
        metadata = metadata.filter(obj => obj.id == selection)[0];

        d3.select('.panel-body').html('');
        Object.entries(metadata).forEach(([key, val]) => {
            d3.select('.panel-body').append('h6').text(`${key.toUpperCase()}: ${val}`);
        });

        samples = samples.filter(obj => obj.id == selection)[0];
        var { otu_ids, sample_values, otu_labels } = samples;
        console.log(samples);
        var data = [
            {
              y: otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`),
              x: sample_values.slice(0,10).reverse(),
              text: otu_labels.slice(0,10).reverse(),
              type: 'bar',
              orientation: 'h'
            }
          ];
          
          Plotly.newPlot('bar', data);
    });
    





var bubble = {
    x: `otu_ids`,
    y: `sample_values`,
    text: `otu_labels`,
    mode: 'markers',
    marker: {
        color: sampleSubjectOTUs,
      opacity: [1, 0.8, 0.6, 0.4],
      size: [`sample_values`]
    }
  };
  
  var data = [bubble];
  
  var layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 600,
    width: 600
  };
  type: bubble
  Plotly.newPlot('bubble', data, layout);
console.log

function optionChanged() {
    showData();
};