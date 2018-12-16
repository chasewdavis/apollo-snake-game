import React, { Component } from 'react';
import UpdatePostion from '../apollo/graphql/UpdatePosition';
import { compose, withApollo, graphql } from 'react-apollo';

class ArrowKeys extends Component {
    componentDidMount() {
        window.addEventListener('keydown', (e) => this.handleClick(e.key));
    }

    handleClick(direction) {
        const { updatePosition } = this.props;
        
        switch(direction) {
            case 'ArrowUp':
                return updatePosition({ variables: { y: -1 } });
            case 'ArrowLeft':
                return updatePosition({ variables: { x: -1 } });
            case 'ArrowDown':
                return updatePosition({ variables: { y: 1 } });    
            case 'ArrowRight':
                return updatePosition({ variables: { x: 1 } });
            default:
                console.log('no direction found');
                break;
        }
    }

    render() {
        return (
            <div className="arrow-keys">
                <div className="upper-keys">
                    <button onClick={() => this.handleClick('ArrowUp')}/>
                </div>
                <div className="lower-keys">
                    <button onClick={() => this.handleClick('ArrowLeft')}/>
                    <button onClick={() => this.handleClick('ArrowDown')}/>
                    <button onClick={() => this.handleClick('ArrowRight')}/>
                </div>
            </div>
        )
    }
}

export default compose(
    withApollo,
    graphql(UpdatePostion, {
        name: 'updatePosition'
    })
)(ArrowKeys);
