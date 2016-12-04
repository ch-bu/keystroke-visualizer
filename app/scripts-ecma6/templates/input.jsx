define(['react'], (React) => {
    
    class Input extends React.Component {

        constructor(props) {
            super(props);
            this.state = {value: ''};
            this.handleKeystroke = this.handleKeystroke.bind(this);
        }

        handleKeystroke(event) {
            // Set value to current text
            this.setState({value: event.target.value});

            // Set model 
            this.props.model.set({'text': this.state.value});
            console.log(this.props.model.toJSON());
        }

        render() {
            return (
                <textarea id="inputTextarea" onChange={this.handleKeystroke} type="text" autoFocus></textarea>
            );
        }
    }

    return Input;
});

