import React, { useState } from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth';
import api from "../utils/api";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [createColor, setCreateColor] = useState({
    code: {hex: ''},
    color: '',
    id: Date.now()
  })
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      updateColors([ ...colors.filter(color => color.id !== colorToEdit.id), res.data ]);
      setEditing(false);
    })
    .catch(err => console.log('Edit not saved', err));
  };

  const deleteColor = color => {
    axiosWithAuth()
			.delete(`/api/colors/${color.id}`)
			.then(res => updateColors(colors.filter(color => color.id !== res.data)))
      .catch(err => console.log('Undeleted', err)); 
    };
    
    const createColorSubmit = e =>{
      e.preventDefault();
      api().post('/api/colors', createColor)
      .then(()=>{
        alert('color created')
        api().get('/api/colors')
        .then(res => updateColors(res.data))
        .catch(err => console.log(err))
      })
    }
    const createOnChange = e =>{
      e.preventDefault();
      setCreateColor({
        ...createColor,
        [e.target.name]: e.target.value
      })
    }
  
  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <div className="spacer">
      {/* stretch - build another form here to add a color */}	       
       <h1>Add A Color</h1>
      <form className="addColor" onSubmit={createColorSubmit}>
      <input
        type="text"
        name="color"
        value={createColor.color}
        onChange={createOnChange}
        placeholder="Color Name"
        style={{width:'95%', margin: '0 auto'}}
        />
        <input
        type="text"
        name="code"
        value={createColor.code.hex}
        onChange={e => setCreateColor({...colorToEdit, code: {hex: e.target.value}})}
        placeholder="hex code"
        style={{width:'95%', margin: '0 auto'}}
        />

        <button type="submit">Create!</button>
      </form>
      </div>    </div>
  );
};

export default ColorList;