define(['react'], (React) => {
    
    class Input extends React.Component {

        render() {
            return (
                <input style={styles.input} type="text" />
            );
        }
    }

    let styles = {
        input: {
            opacity: "0.7",
            borderRadius: "20px",
            border: "0",
            fontSize: "2em",
            padding: "10px",
            transition: "box-shadow 0.3s",
            marginTop: "30vh",
            marginLeft: "30vw",
            fontFamily: 'Aref Ruqaa',
        }
    }


    return Input;
});

