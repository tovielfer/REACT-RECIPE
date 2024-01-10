import { Button, Card, CardContent, Icon, Image, CardDescription, CardHeader } from "semantic-ui-react";
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from 'axios';
import Swal from 'sweetalert2'

const Recipe = ({ recipe }) => {
    const [categories, setCategories] = useState([]);
    const userid = localStorage.getItem("userId");
    const difficultyList = [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/category");
                setCategories(response.data);
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

    const AddToCart = (product) => {
        axios.post(`http://localhost:8080/api/bay`, { Name: product, Count: 1, UserId: userid })
            .then(() => {
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title:  product+ "\n"+ "נוסף בהצלחה לרשימת הקניות שלך" ,
                    showConfirmButton: false,
                    timer: 2000
                });
            })
            .catch(err => console.log(err.response))
    }

    return (
        <Card color='teal' style={{ width: "25%" }} כ>
            <Image wrapped src={recipe.Img} size="large" className="recipe-img" />
            <CardContent>
                <CardHeader >{recipe.Name}</CardHeader>
                <CardDescription>{recipe.Description}</CardDescription>
                <br></br>
                <b>רכיבים:</b>
                {recipe.Ingrident.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Button style={{ marginLeft: "10px" }} inverted color='teal' circular icon='plus cart' onClick={() => AddToCart(x.Name)} />   {x.Count} {x.Type} {x.Name} </div>)}
                <br></br>
                <b>הוראות הכנה:</b> {recipe.Instructions.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Icon style={{ margin: "10px" }} color='teal' name="heart outline" /> {x}</div>)}

            </CardContent>
            <CardContent extra>
                <span>
                    <Icon color='teal' name='align justify' />
                    {" " + categories?.find(c => c.Id === recipe.CategoryId)?.Name + " "}
                </span>
                <span>
                    <Icon color='teal' name='hourglass half' />
                    {" " + recipe.Duration + " דקות "}
                </span>
                <span>
                    <Icon color='teal' name='sliders horizontal' />
                    {" " + difficultyList?.find(d => d.Id === recipe.Difficulty)?.Name + " "}
                </span>

            </CardContent>
        </Card>
    )
}

export default Recipe