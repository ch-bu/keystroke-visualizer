define(['test', 'react'], (Test, React) => {
    class Goal extends React.Component {

        constructor() {
            super();
            this.state = {house: 'MyTest'};
        }
        render() {
            return (
                <div className="test">
                    <h1>{this.props.name}</h1>
                    <h2>{this.state.house}</h2>
                </div>
            );
        }
    }

    return Goal;
});

