import React from "react";
import { withRouter } from 'react-router-dom';



class InfoMethod extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id } = this.props.match.params;
        return (
            <div>
                 ID фрагмента:{id}
            </div>
        )
    }
}

export default withRouter(InfoMethod)
