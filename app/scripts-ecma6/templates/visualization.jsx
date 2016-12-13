define(['react', 'd3', 'jquery'], (React, d3, $) => {
    
    class Visualization extends React.Component {

        constructor(props) {
            super(props);

            // Listen for updates in the modal
            props.mainView.listenTo(props.mainView.textModel,
                'change:charDict', this.dataChanged.bind(this));

            // Listen for resize events
            d3.select(window)
                .on('resize', this.windowResized.bind(this));
        }

        render() {

            return (
                <svg width={this.props.width} height={this.props.height}>
                </svg>
            );
        }

        windowResized() {
            // Init variables
            var svg = d3.select('svg');
            var height = $('#data-display').height();
            var width = $('#data-display').width();
            var wrapperHeight = height - this.state.margin.top - this.state.margin.bottom;
            var wrapperWidth = width - this.state.margin.left - this.state.margin.right;

            // Update svg 
            svg
                .attr('height', height)
                .attr('width', width);

            // Update frame g element
            var g = d3.select('#frame')
                .attr('width', wrapperWidth)
                .attr('height', wrapperHeight)

            // Update x-axis height
            d3.select('.axis-x')
                .attr('transform', 'translate(0,' + wrapperHeight + ')');

            // Rescale y
            this.state.y.range[height, 0];
            // console.log(this.state.height);
            
            // Rescale x
            var x = d3.scaleBand()
                .domain('abcdefghijklmnopqrstuvwxyz'.split(''))
                .range([0, wrapperWidth]);
            
            svg.select('.axis-x')
                .call(d3.axisBottom(x));

            // Rescale y
            var y = d3.scaleBand()
                .domain(Array.apply(null, {length: 100}).map(Number.call, Number))
                .range([wrapperHeight, 0])
                .paddingInner([0.1]);
            
            // Rescale rectangles
            d3.select('#frame')
                .selectAll('rect')
                .attr('x', (d) => x(d[0]))
                .attr('y', (d) => y(d[1]))
                .attr('width', wrapperWidth / 28)
                .attr('height', wrapperHeight / 140)
        }

        componentDidMount() {
            // Variable declaration
            const svg = d3.select('svg');
            const margin = {top: 30, right: 10, bottom: 30, left: 20};
            const width = svg.attr('width') - margin.left - margin.right;
            const height = svg.attr('height') - margin.top - margin.bottom;

            // Append g with margins
            const g = svg.append('g')
                .attr('id', 'frame')
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
            var y = d3.scaleBand()
                .domain(Array.apply(null, {length: 100}).map(Number.call, Number))
                .range([height, 0])
                .paddingInner([0.1]);

            // Save state variables
            this.setState({svg: svg, x: x, y: y, height: height, width: width, margin: margin});
        }

        dataChanged() {
            // Get data
            var data = this.props.mainView.textModel.get('charDict');

            // Get all rectangles
            var rect = d3.select('#frame')
                .selectAll('rect')
                .data(data, (d) => d[2]);

            // Add new elements
            rect.enter().append('rect')
                .attr('x', (d) => this.state.x(d[0]))
                .attr('y', 0)
                .attr('width', this.state.width / 28)
                .attr('height', this.state.height / 140)
                .transition()
                .duration(200)
                .attr('y', (d) => this.state.y(d[1]));

            // Remove old elements
            rect.exit().remove();
        }
    }

    return Visualization;
});

