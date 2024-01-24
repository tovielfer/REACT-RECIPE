import Header from '../pages/Header';
import Category from "./Category"
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, FormGroup, Icon, Message, Segment } from "semantic-ui-react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useFieldArray } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { addRecipe, editRecipe } from '../service/recipes';
import React from 'react';
import { getCategories } from '../service/category';
import { useLocation } from 'react-router-dom';
const InputRef = React.forwardRef(({ ...rest }, ref) => (
    <input  {...rest} ref={ref} />
));
const AddRecipe = () => {

    const schema = yup.object({
        CategoryId: yup.number().integer().required().min(1, "יש לבחור קטגוריה"),
        Name: yup.string().required("יש להכניס שם"),
        UserId: yup.number().required(),
        Img: yup.string().url().required("יש להכניס כתובת URL של תמונה"),
        Duration: yup.number("משך זמן צריך להיותר מספר").positive("משך זמן לא יכול להיות מספר שלילי").required("יש להכניס משך זמן"),
        Difficulty: yup.number().integer().positive().required().min(1, "יש לבחור רמת קושי"),
        Description: yup.string().required("יש להכניס תיאור"),
        Instructions: yup.array(yup.string().required("יש להכניס הוראה")),
        Ingrident: yup.array().of(
            yup.object().shape({
                Name: yup.string().required("הכנס שם"),
                Count: yup.string("הכנס מספר").required("הכנס כמות"),
                Type: yup.string().required("הכנס סוג")
            })
        )
    });
    useEffect(() => {
        if (!categories.length)
            dispatch(getCategories())
    }, []);

    const { state } = useLocation();
    const difficultyList = [{ Id: 1, Name: 'קל' }, { Id: 2, Name: 'בינוני' }, { Id: 3, Name: 'קשה' }]
    const userId = localStorage.getItem("userId");
    const dispatch = useDispatch();
    const categories = useSelector(state => (state.category.categories));
    const { register, control, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            Name: state?.Name, UserId: userId, CategoryId: state?.CategoryId,
            Img: state?.Img, Duration: state?.Duration, Difficulty: state?.Difficulty,
            Description: state?.Description, Ingrident: state?.Ingrident, Instructions: state?.Instructions
        }
    });
    const { fields: Instructions, append: appendInstructions, remove: InstructionsRemove } = useFieldArray({
        control, name: "Instructions"
    });
    const { fields: Ingrident, append: appendIngridents, remove: IngridentRemove } = useFieldArray({
        control, name: "Ingrident"
    });
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log("state", state);
        console.log("data", data);
        if (state == null)
            dispatch(addRecipe(data, userId))
        else
            dispatch(editRecipe(data, state))
        navigate('/allRecipes')
    }
    useEffect(() => {
        if (state) {
            // Set initial values for Ingrident array
            state.Ingrident.forEach((ingrident, index) => {
                setValue(`Ingrident.${index}.Name`, ingrident.Name || '');
                setValue(`Ingrident.${index}.Count`, ingrident.Count || '');
                setValue(`Ingrident.${index}.Type`, ingrident.Type || '');
            });

            // Set initial values for Instructions array
            state.Instructions.forEach((instruction, index) => {
                setValue(`Instructions.${index}`, instruction || '');
            });
        }
    }, [state, setValue]);
    return (
        <div>
            <Header page={'הוספת מתכון'} />
            <>
                <div className="container">
                    <Segment placeholder /*color="yellow"*/>
                        <Form onSubmit={handleSubmit(onSubmit)} widths="equal">
                            <Form.Field >
                                <label>שם מתכון</label>
                                <input {...register("Name")} defaultValue={state?.Name} />
                            </Form.Field>
                            {errors.Name?.message ? <Message warning content={errors.Name.message} /> : <></>}
                            <Form.Field>
                                <label>קטגוריה</label>
                                <select {...register("CategoryId")} name="CategoryId" defaultValue={state ? state.CategoryId : 0}>
                                    <option value={0} disabled>קטגוריה</option>
                                    {categories?.map((category) =>
                                        <option key={category.Id} value={category.Id}>{category.Name}</option>
                                    )}
                                </select>
                                {errors.CategoryId?.message ? <Message warning content={errors.CategoryId.message} /> : <></>}
                            </Form.Field>
                            <Form.Field >
                                <Category />
                            </Form.Field>
                            <Form.Field>
                                <label>רמת קושי</label>
                                <select {...register("Difficulty")} name="Difficulty" defaultValue={state ? state.Difficulty : 0}>
                                    <option value="0" disabled>רמת קושי</option>
                                    {difficultyList.map((difficulty) => <>
                                        <option key={difficulty.Id} value={difficulty.Id}>{difficulty.Name}</option></>)}
                                </select>
                                {errors.Difficulty?.message ? <Message warning content={errors.Difficulty.message} /> : <></>}
                            </Form.Field>
                            <Form.Field>
                                <label>קישור לתמונה</label>
                                <InputRef {...register("Img")} defaultValue={state?.Img} />
                            </Form.Field>
                            {errors.Img?.message ? <Message warning content={errors.Img.message} /> : <></>}
                            <Form.Field>
                                <label>תיאור</label>
                                <InputRef {...register("Description")} defaultValue={state?.Description} />
                            </Form.Field>
                            {errors.Description?.message ? <Message warning content={errors.Description.message} /> : <></>}
                            <Form.Field>
                                <label>זמן הכנה בדקות</label>
                                <InputRef {...register("Duration")} defaultValue={state?.Duration} />
                            </Form.Field>
                            {errors.Duration?.message ? <Message warning content={errors.Duration.message} /> : <></>}

                            <h4>רכיבים</h4>
                            {Ingrident?.map((ingredient, index) =>
                                <FormGroup key={index}>
                                    <Form.Field>
                                        <label>מוצר</label>
                                        <InputRef {...register(`Ingrident.${index}.Name`)} defaultValue={ingredient?.Name} placeholder="שם מוצר" />
                                        <p>{errors[`Ingrident.${index}.Name`]?.message}</p>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>כמות</label>
                                        <InputRef {...register(`Ingrident.${index}.Count`)} defaultValue={ingredient?.Count} placeholder="כמות" />
                                        <p>{errors[`Ingrident.${index}.Count`]?.message}</p>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>סוג</label>
                                        <InputRef {...register(`Ingrident.${index}.Type`)} defaultValue={ingredient?.Type} placeholder="סוג" />
                                        <p>{errors[`Ingrident.${index}.Type`]?.message}</p>
                                    </Form.Field>
                                    <Button icon size='large' floated="left" onClick={() => IngridentRemove(index)}>
                                        <Icon color="yellow" name='trash alternate' />
                                    </Button>
                                </FormGroup>
                            )}
                            <Button onClick={() => appendIngridents({ Name: "", Count: 0, Type: "" })}>
                                <Icon name="plus" style={{ margin: 10 }} /> הוסף מוצר</Button>
                            <h4>הוראות הכנה</h4>
                            {Instructions?.map((instruction, index) =>
                                <FormGroup key={index}>
                                    <Form.Field>
                                        <label>הוראה</label>
                                        <InputRef {...register(`Instructions.${index}`)} defaultValue={instruction} placeholder="הוראת הכנה" />
                                        <p>{errors.Instructions?.message}</p>
                                    </Form.Field>

                                    <Button icon size='large' floated="left" onClick={() => InstructionsRemove(index)}>
                                        <Icon name='trash alternate' />
                                    </Button>
                                </FormGroup>
                            )}
                            <Button onClick={() => appendInstructions(null)}>
                                <Icon name="plus" style={{ margin: 10 }} /> הוסף הוראה</Button>
                            <br />
                            <Button size="medium" type='submit' floated="left" >
                                <Icon name='save' style={{ margin: 10 }} />שמירה
                            </Button>
                        </Form>
                    </Segment>
                </div>
            </>
        </div>
    )
}

export default AddRecipe;