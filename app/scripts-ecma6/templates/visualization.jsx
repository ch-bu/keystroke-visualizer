define(['react', 'd3', 'jquery'], (React, d3, $) => {
    
    class Visualization extends React.Component {

        constructor(props) {
            super(props);

            // Listen for updates in the modal
            props.mainView.listenTo(props.mainView.textModel,
                'change:charDict', this.dataChanged.bind(this));
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
                .domain(Array.apply(null, {length: 50}).map(Number.call, Number))
                .range([height, 0])
                .paddingInner([0.1]);

            // var yAxis = d3.axisLeft(y);

            // g.append('g')
            //     .attr('class', 'axis axis-y')
            //     .call(yAxis);

            this.setState({svg: svg, x: x, y: y});
        }

        dataChanged() {
            // Get data
            var data = this.props.mainView.textModel.get('charDict');

            var rect = d3.select('#frame')
                .selectAll('rect')
                .data(data);

            rect.enter().append('rect')
                .attr('x', (d) => this.state.x(d[0]))
                .attr('y', (d) => this.state.y(d[1]))
                .attr('width', 25)
                .attr('height', 4)
                .merge(rect);

            rect.exit().remove();

            // d3.select('#frame').append('rect')
            //     .attr('x', this.state.x('b'))
            //     .attr('y', this.state.y(2))
            //     .attr('width', 30)
            //     .attr('height', 4);

            // console.log(data);
        }
    }

    return Visualization;
});

