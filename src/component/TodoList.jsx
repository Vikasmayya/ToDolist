import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';


const getLocalItems = () =>{
    let list = localStorage.getItem('list');
    console.log(list);
    if(list){
        return JSON.parse(localStorage.getItem('list'));
    }else{
        return [];
    }
}

const TodoList = () => {

    const [item, setItem] = useState("");
    const[newItem, setNewItem] = useState(getLocalItems());
    const[toggle, setToggle] = useState(true);
    const[toggleEdit, setToggleEdit] = useState(null);
    const [showResults, setShowResults] = useState(false);

    const itemList = () => {
        if(!item){
            alert(`please fill the input field.`);
        }else if(item && !toggle){
            setNewItem(
                newItem.map((val) =>{
                    if(val.id === toggleEdit){
                        return {...val, name:item}
                    }
                    return val;
                })
            )
            setToggle(true);
            setItem('');
            setToggleEdit(null);
            setShowResults(true);
        }else{
            const allItem = {id: new Date().getTime().toString(), name:item}
            setNewItem([...newItem, allItem]);
            setItem(""); 
            setShowResults(true);
        }
    };  

    const deleteItem = (index) =>{
        const updatedItem = newItem.filter((val) =>{
            return index !== val.id;
        })
        setNewItem(updatedItem);
    };

    const removeAll =() =>{
        setNewItem([]);
    }

    const editItem = (id) =>{
        let newEditItem = newItem.find((val) =>{
            return val.id === id;
        });
        setToggle(false);
        setItem(newEditItem.name);
        setToggleEdit(id);
    }

    useEffect(() => {
       localStorage.setItem('list', JSON.stringify(newItem));
    }, [newItem]);

    return(
        <>
            <div className="main_div">
                <div className="center_div">
                    <br/>
                    <h1> TodoList</h1>
                    <br/>
                    <input type="text" placeholder="Add an Item" onChange={(e)=> setItem(e.target.value)} value={item}/>
                    <Tooltip title="Add Items">
                    
                     {
                         toggle ?<Button className="newBtn" onClick={itemList}> <AddIcon/></Button>
                          : <Button className="newBtn" onClick={itemList}><EditIcon/></Button>
                     } 
                    
                    </Tooltip>
                    <br/>
                    <ol style={{"paddingLeft":"0"}}>
                    <hr style={{"color":"black","opacity":"0.5"}}/>
                        {newItem.map((val, id) => {
                            return (
                                <>
                                <div className="todo_style" key={val.id}>
                                    <Tooltip title="Edit Item">
                                    <span onClick={() => editItem(val.id)}> 
                                    <EditIcon className="deleteIcon"/>
                                    </span>
                                    </Tooltip>
                                    <Tooltip title="Delete Item">
                                    <span onClick={() => deleteItem(val.id)}> 
                                    <DeleteIcon className="deleteIcon"/>
                                    </span>
                                    </Tooltip>
                                    <li>{val.name}</li>
                                </div>
                                <hr/>
                                </>
                            )
                        })}
                    </ol>
                   { showResults?<Tooltip title="Remove all Items">
                    <Button className="newBtn1" onClick={removeAll}> <DeleteIcon/></Button>
                    </Tooltip>: null}
                    <br/>
                </div>
            </div>
        </>
    );
};

export default TodoList;