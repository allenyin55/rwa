import React, { PropTypes as T } from 'react'
import AuthService from '../utils/AuthService'
import { Button } from 'react-bootstrap';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.props.auth.lock.on('authenticated', (authResult) => {
            this.context.router.push('/books')
        });
    }

    static contextTypes = {
        router: T.object
    };

    static propTypes = {
        location: T.object,
        auth: T.instanceOf(AuthService)
    };

    render() {
        const { auth }  = this.props;

        return (
            <div className="text-xl-center" style={{paddingTop: 6+"rem"}}>
                <h2>Reading with Annie</h2>
                {/*<img src="/images/Annie.jpg" style={{width: 650+"px"}}/>*/}
                <div>
                    <Button  bsStyle="primary" bsSize="large" onClick={auth.login.bind(this)}>Login</Button>
                </div>
            </div>
        )
    }
}
