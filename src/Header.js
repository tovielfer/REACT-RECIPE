import { Link } from "react-router-dom";
import React, { useState } from 'react'
import { Input, Menu, Segment, Icon, IconGroup } from 'semantic-ui-react'
import { useSelector } from 'react-redux';



const Home = ({ page }) => {
    const user = useSelector(state => state.user);
    return (
        <>
            <Menu pointing secondary>
                <Link to="/home">
                    <Menu.Item
                        name='דף הבית'
                        active={page === 'דף הבית'}
                    />
                </Link>
                <Link to="/userrecipes">
                    <Menu.Item
                        name='המתכונים שלי'
                        active={page === 'המתכונים שלי'}
                    />
                </Link>
                <Link to="/allRecipes">
                    <Menu.Item
                        name='מתכונים'
                        active={page === 'מתכונים'}
                    />
                </Link>
                <Link to="/buy">
                    <Menu.Item
                        name='רשימת קניות'
                        active={page == 'רשימת קניות'}
                    />
                </Link>
                <Link to="/addRecipe">
                    <Menu.Item
                        name='הוספת מתכון'
                        active={page === 'הוספת מתכון'}
                    />
                </Link>
                <Link to="/addCategory">
                    <Menu.Item
                        name='הוספת קטגוריה'
                        active={page === 'הוספת קטגוריה'}
                    />
                </Link>
                <Link to="/">
                    <Menu.Menu position='left'>
                        <Menu.Item
                            name='החלף משתמש'
                        />
                    </Menu.Menu>
                </Link>
            </Menu>
            <div style={{ textAlign: "left", marginLeft: "10px" }}>
                <b>שלום {localStorage.getItem("user")}</b>
                <Icon inverted color="teal" size='big' circular name="user" />
            </div>
        </>
    )
}

export default Home;