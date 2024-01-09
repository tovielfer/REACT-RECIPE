import { Button, ButtonContent, Card, CardContent, Header, Icon, Image, Segment, SegmentGroup, CardDescription, CardHeader } from "semantic-ui-react";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

const Recipe = ({ recipe }) => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
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
        axios.post(`http://localhost:8080/api/bay`, { Name: product.Name, UserId: 2, Count: 1 })
    }

    return (
        <Card color='teal' style={{ width: "25%" }} כ>
            <Image wrapped src={recipe.Img} size="large" className="recipe-img" />
            <CardContent>
                <CardHeader >{recipe.Name}</CardHeader>
                <CardDescription>{recipe.Description}</CardDescription>
                <br></br>
                <b>רכיבים:</b>
                {recipe.Ingrident.map((x, i) => <div style={{textAlign:"right"}} key={i}> <Button style={{marginLeft:"10px"}} inverted color='teal' circular icon='cart arrow down' onClick={() => AddToCart(x.Name)} />   {x.Count} {x.Type} {x.Name} </div>)}
                <br></br>
                <b>הוראות הכנה:</b> {recipe.Instructions.map((x, i) => <div style={{textAlign:"right"}}  key={i}> <Icon style={{marginLeft:"10px"}} color='teal'name="heart outline" /> {x}</div>)}

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
            {/*   
            רכיבים: {recipe.Ingrident.map((x, i) => <div key={i}> <button onClick={() => AddToCart(x.Name)}><Icon name='cart arrow down' /></button> {x.Count} {x.Type} {x.Name} </div>)}
            הוראות הכנה: {recipe.Instructions.map((x, i) => <div key={i}>{x}</div>)} */}
        </Card>
    )
}

export default Recipe