define(['react'], (React) => {
    
    class Input extends React.Component {

        constructor() {
            super();
            this.state = {value: ''};
            this.handleKeystroke = this.handleKeystroke.bind(this);
        }

        handleKeystroke(event) {
            // e.preventDefault();
            this.setState({value: event.target.value});
            console.log(this.state);
        }

        render() {
            return (
                <textarea id="inputTextarea" onChange={this.handleKeystroke} type="text" autoFocus></textarea>
            );
        }
    }

    // let styles = {
    //     input: {
    //         opacity: "0.7",
    //         borderRadius: "20px",
    //         border: "0",
    //         fontSize: "2em",
    //         padding: "10px",
    //         transition: "box-shadow 0.3s",
    //         marginTop: "30vh",
    //         marginLeft: "30vw",
    //         fontFamily: 'Aref Ruqaa',
    //     }
    // }


    return Input;
});

