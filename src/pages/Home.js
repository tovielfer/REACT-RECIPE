import { useSelector } from 'react-redux';
import Header from './Header';
import img from "../pictures/img (30).jpg";

const Home = () => {
    const user = useSelector(state => state.user);
    return (
        <div>
            <Header page={'דף הבית'} />
            <h1>ברוכים הבאים לאתר מתכונים!!!!</h1>
            <img style={{ height: "80vh" }} src={img}/>
        </div>
    )
}

export default Home;