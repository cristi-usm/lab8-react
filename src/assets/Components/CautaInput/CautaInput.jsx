import { useState } from 'react';
import './CautaInput.css';

const categorii = ['', 'Beef', 'Chicken', 'Dessert', 'Pasta', 'Seafood', 'Vegetarian', 'Pork', 'Lamb'];

const traduceri = {
  '': 'Toate categoriile',
  'Beef': 'Vită',
  'Chicken': 'Pui',
  'Dessert': 'Desert',
  'Pasta': 'Paste',
  'Seafood': 'Peste și fructe de mare',
  'Vegetarian': 'Vegetarian',
  'Pork': 'Porc',
  'Lamb': 'Miel',
};

function CautaInput({ cautaCuvint }) {
  const [text, setText] = useState('');
  const [categorie, setCategorie] = useState('');

  function trimite(e) {
    e.preventDefault();
    cautaCuvint(text, categorie);
  }

  return (
    <div className="parteaDeCautare">
      <form onSubmit={trimite} className="cautareFormular">
        <select
          className="selecteazaCategoria"
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          {categorii.map(categ => (
            <option key={categ} value={categ}>
              {traduceri[categ]}
            </option>
          ))}
        </select>

        <div className="grupInputuri">
          <input
            type="text"
            className="textInput"
            placeholder="Cauta o reteta..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="cautaBtn">Cauta</button>
        </div>
      </form>
    </div>
  );
}

export default CautaInput;
