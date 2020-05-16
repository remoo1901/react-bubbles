import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../util/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState(initialColor);

  const { push } = useHistory();

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
    console.log(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        console.log(res.data);
        setEditing(false);
        window.location.reload();
        push(`/protected`);
      })
      .catch((err) => console.log("ERROR", err));
  };

  const deleteColor = (color) => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const addColor = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`/colors`, newColor)
      .then((res) => {
        setNewColor(...colors, newColor);
        window.location.reload();
      })
      .catch((err) => console.log("Error", err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
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
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>

          <div className="spacer" />
        </form>
      )}

      <form>
        <legend>Add Color</legend>
        <label>
          color name:
          <input
            type="text"
            name="color"
            value={newColor.color}
            onChange={(e) =>
              setNewColor({ ...newColor, color: e.target.value })
            }
          />
        </label>

        <label>
          hex code:
          <input
            type="text"
            name="hex"
            value={newColor.code.hex}
            onChange={(e) =>
              setNewColor({ ...newColor, code: { hex: e.target.value } })
            }
          />
        </label>

        <div className="button-row">
          <button type="submit" onClick={addColor}>
            Add Color
          </button>
        </div>
      </form>
    </div>
  );
};

export default ColorList;
