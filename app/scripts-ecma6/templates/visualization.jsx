define(['react'], (React) => {
    
    class Visualization extends React.Component {

        constructor(props) {
            super(props);
            // this.state = {value: ''};
            // this.handleKeystroke = this.handleKeystroke.bind(this);
        }

        render() {
            return (
                <svg></svg>
            );
        }
    }

    return Visualization;
});

