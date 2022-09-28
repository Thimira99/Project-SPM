import React, { Component } from 'react';
import HashLoader from "react-spinners/HashLoader";

function loader() {
    
        return (
            <>
            <div>
                xxxxxxxxxxxxxxx

                <div className="sweet-loading">
                    <HashLoader
                        color="#4b3ad7"
                        cssOverride={{}}
                        size={100}
                        speedMultiplier={1}
                        loading={this.state.loading}
                    />
                </div>

            </div>
            </>
        );
   
}

export default loader;