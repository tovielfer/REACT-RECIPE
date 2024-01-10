import Header from './Header';
import { List, Button, ListContent, ListHeader, ListItem, ListIcon, Icon } from 'semantic-ui-react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';


const Buy = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/bay/${localStorage.getItem("userId")}`)
                setShoppingList(response.data);
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "אופסס....",
                    text: err.response.data
                });
            }
        };
        fetchData();
    }, []);

    const updateCount = (product, count) => {
        console.log("count", count);
        console.log("product count", product.Count);
        if (product.Count + count == 0) {
            Swal.fire({
                title: "למחוק סופית?",
                text: product.Name + " יוסר מהרשימה שלך",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "ביטול",
                confirmButtonText: "כן, אני רוצה למחוק!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://localhost:8080/api/bay/delete/${userId}/${product.Id}`, { UserId: userId, Id: product.Id }).then(() => {
                        Swal.fire({
                            title: "נמחק!",
                            text: product.Name + "הוסר מרשימת הקניות שלך",
                            icon: "success"
                        });
                    }).catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "אופסססס...",
                            text: err.response.data,
                            confirmButtonText: "😭😭😭"
                        });
                    });

                }
            });
        }
        else {
            axios.post(`http://localhost:8080/api/bay/edit`, { Id: product.Id, Name: product.Name, UserId: userId, Count: product.Count + count }).then(res => {
                console.log(res, "res");
            }).catch((err) => {
                console.log(err, "err");
            })
        }
    }

    return (
        <div>
            <Header page={'רשימת קניות'} />
            <List selection verticalAlign='middle' divided style={{ width: "40%", margin: "auto" }}>
                {shoppingList.map(item => (
                    <ListItem key={item.Id}>
                        <ListIcon><Button onClick={() => updateCount(item, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='minus circle' /></Button></ListIcon>
                        <ListIcon><Button onClick={() => (item, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='plus circle' /></Button></ListIcon>
                        <ListContent >
                            <h2>{item.Count} {item.Name}</h2>
                        </ListContent>
                        <ListIcon><Button onClick={() => updateCount(item, -item.Count)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='trash alternate' /></Button></ListIcon>
                    </ListItem>
                    // <div >
                    //     <p>Name: {item.Name}</p>
                    //     <p>Count: {item.Count}</p>
                    // </div>
                ))}
            </List>
        </div>
    )
}

export default Buy;