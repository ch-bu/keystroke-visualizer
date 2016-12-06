define(['react', 'd3'], (React, d3) => {
    
    class Visualization extends React.Component {

        constructor(props) {
            super(props);

            console.log(props.mainView.textModel.toJSON());
            props.mainView.listenTo(props.mainView.textModel, 'change:charDict', this.testo);
        }

        render() {
            return (
                <svg width={this.props.width} height={this.props.height}>
                <XAxis />
                </svg>
            );
        }

        testo() {
            console.log('test');
        }
    }

    class XAxis extends React.Component {
        render() {
            return (
                <g></g>
            )
        }
    }

    return Visualization;
});

