import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EnterPage = () => {

    return (
        <div>
            <br/>
            <h1 style={{color:'teal'}}>ברוכים הבאים לאתר מתכונים!</h1>
            <Link to="/login">
                <Button animated='fade' color='teal'>
                    <Button.Content visible>התחברות</Button.Content>
                    <Button.Content hidden>Log In</Button.Content>
                </Button>
            </Link>
            <Link to="/signup">
                <Button animated='fade' color='teal'>
                    <Button.Content visible>הרשמה</Button.Content>
                    <Button.Content hidden>Sign Up</Button.Content>
                </Button>
            </Link>
        </div>
    );
}

export default EnterPage;