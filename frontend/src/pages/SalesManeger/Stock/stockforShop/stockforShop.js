import React, { Component } from 'react';
import SalesRepDashboard from '../../../../components/SalesRepDashboard';

class stockforShop extends Component {

    constructor(props){
        super(props)

        this.state ={

            shopID: this.props.match.params.id,
        }

    }

    render() {
        return (
            <>
              <SalesRepDashboard />
                
            </>
        );
    }
}

export default stockforShop;