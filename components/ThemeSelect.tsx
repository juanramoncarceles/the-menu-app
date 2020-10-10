interface IProps {
  changeTheme: (key: string) => void;
}

const ThemeSelect = ({changeTheme}: IProps) => {
  
  return (
  <div className="root">
    <label htmlFor="theme">Theme</label>
    <select name="theme" id="theme" onChange={e => changeTheme(e.target.value)}>
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
