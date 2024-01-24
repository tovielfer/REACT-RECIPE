import { Button, Card, CardContent, Icon, Image, CardDescription, CardHeader } from "semantic-ui-react";
import React, { useEffect } from 'react';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { deleteRecipe } from '../service/recipes';
import { useSelector } from "react-redux";
import { addFromRecipe } from "../service/shopping"
import { useNavigate } from "react-router-dom";
export const Recipe = ({ recipe }) => {

    const categories = useSelector(state => (
        state.category.categories
    ));
   const navigate=useNavigate();
    const userid = localStorage.getItem("userId");
    const difficultyList = [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }]
    const dispatch = useDispatch();
    // useEffect(function () {
    //     axios.get("http://localhost:8080/api/category").then((response) => {
    //         getCategories(response.data);
    //     }).catch(err => console.log(err))
    // }, []);
    const deleteRecipe2 = () => {
        Swal.fire({
            position: "top-right",
            title: "למחוק " + recipe.Name + " ? ",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "ביטול",
            confirmButtonText: "כן, אני רוצה למחוק!"
        }).then(result => {
            if (result.isConfirmed) {
                dispatch(deleteRecipe(recipe.Id))
                Swal.fire({
                    position: "top-right",
                    icon: "success",
                    title: recipe.Name + "  נמחק בהצלחה!",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
        })
    }

    return (
        <Card color='teal' style={{ width: "20%" }} >
            {userid == recipe.UserId && <>
                <Button style={{ position: "absolute", top: 10, left: 10, zIndex: 1, width: 50 }} inverted color='grey' icon='edit' onClick={() => {navigate('/recipe/edit' ,{ state: recipe })}} />
                <Button style={{ position: "absolute", top: 10, left: 70, zIndex: 1, width: 50 }} inverted color='teal' icon='trash alternate' onClick={() => deleteRecipe2()} />
            </>}
            <Image wrapped src={recipe.Img} size="large" className="recipe-img" />
            <CardContent>
                <CardHeader >{recipe.Name}</CardHeader>
                <CardDescription>{recipe.Description}</CardDescription>
                <br></br>
                <b>רכיבים:</b>
                {recipe.Ingrident.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Button style={{ marginLeft: "10px" }} inverted color='teal' circular icon='plus cart' onClick={() => dispatch(addFromRecipe(x, userid))} />   {x.Count} {x.Type} {x.Name} </div>)}
                <br></br>
                <b>הוראות הכנה:</b> {recipe.Instructions.map((x, i) => <div style={{ textAlign: "right" }} key={i}> <Icon style={{ margin: "10px" }} color='teal' name="heart outline" /> {x}</div>)}

            </CardContent>
            <CardContent extra>
                <span>
                    <Icon color='teal' name='align justify' />
                    {" " + categories[recipe.CategoryId - 1]?.Name
                        // .find(c => c.Id === recipe.CategoryId)?.Name
                        + " "}
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