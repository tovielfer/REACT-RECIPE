import Header from './Header';
import { List, Button, ListContent, ListItem, ListIcon, Icon } from 'semantic-ui-react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCount } from './service/shopping';
import { getShoppingList } from './service/shopping'
import { useSelector } from 'react-redux';

const Buy = () => {

    const { shoppingList } = useSelector(state => ({
        shoppingList: state.buy.buies
    }))
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shoppingList.length) {
            dispatch(getShoppingList(localStorage.getItem("userId")));
        }
    }, [])
   return (
        <div>
            <Header page={'רשימת קניות'} />
            <List selection verticalAlign='middle' divided style={{ width: "40%", margin: "auto" }}>
                {shoppingList.map(item => (
                    <ListItem key={item.Id}>
                        <ListIcon><Button onClick={() => dispatch(updateCount(item, -1))} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='minus circle' /></Button></ListIcon>
                        <ListIcon><Button onClick={() => dispatch(updateCount(item, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='plus circle' /></Button></ListIcon>
                        <ListContent >
                            <h2>{item.Count}{"  "}
                                {item.Name}
                            </h2>
                        </ListContent>
                        <ListIcon><Button onClick={() => dispatch(updateCount(item, -item.Count))} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='vimeo v' />קניתי</Button></ListIcon>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}


export default Buy;