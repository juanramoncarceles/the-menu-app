import { useContext } from "react";
import { DispatchContext } from "../contexts/AppContext";
import { ActionTypes } from "../types/enums";

const ThemeSelect = () => {
  const dispatch = useContext(DispatchContext);
  
  return (
  <div className="root">
    <label htmlFor="theme">Theme</label>
    <select name="theme" id="theme" onChange={e => dispatch({ type: ActionTypes.ChangeTheme, payload: e.target.value })}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>

    <style jsx>{`
      .root {
        position: absolute;
        right: 10px;
        top: 30px;
      }
    `}</style>
  </div>
);}

export default ThemeSelect;
