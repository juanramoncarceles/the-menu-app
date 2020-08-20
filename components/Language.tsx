const LanguageSelect = () => (
  <div className="root">
    <label htmlFor="lang">LANG</label>
    <select name="lang" id="lang">
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>

    <style jsx>{`
      .root {
        position: absolute;
        right: 10px;
        top: 10px;
      }
    `}</style>
  </div>
);

export default LanguageSelect;