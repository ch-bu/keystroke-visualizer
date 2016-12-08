define(['react', 'd3', 'jquery'], (React, d3, $) => {
    
    class Visualization extends React.Component {

        constructor(props) {
            super(props);

            // Listen for updates in the modal
            props.mainView.listenTo(props.mainView.textModel, 'change:charDict', this.dataChanged);
        }

        render() {
            return (
                <svg width={this.props.width} height={this.props.height}>
                </svg>
            );
        }

        componentDidMount() {
            // Variable declaration
            const svg = d3.select('svg');
            const margin = {top: 30, right: 10, bottom: 30, left: 20};
            const width = svg.attr('width') - margin.left - margin.right;
            const height = svg.attr('height') - margin.top - margin.bottom;

            // Append g with margins
            const g = svg.append('g')
                .attr('width', width)
                .attr('height', height)
                .attr('transform', 'translate(' +
                    margin.left + ',' + margin.top + ')');

            ///////////////////
            // Create x axis //
            ///////////////////
            var x = d3.scaleBand()
                .domain('abcdefghijklmnopqrstuvwxyz'.split(''))
                .range([0, width]);

            var xAxis = d3.axisBottom(x);

            g.append('g')
                .attr('class', 'axis axis-x')
                .attr('transform', 'translate(0,' + height + ')')
                .call(xAxis);

            ///////////////////
            // Create y axis //
            ///////////////////
            var y = d3.scaleLinear()
                .domain([0, 30])
                .range([height, 0]);

            var yAxis = d3.axisLeft(y);

            g.append('g')
                .attr('class', 'axis axis-y')
                .call(yAxis);
        }

        dataChanged() {
            console.log('test');
        }
    }

    return Visualization;
});

