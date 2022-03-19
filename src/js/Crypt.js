import React, { useState } from 'react';

const Crypt = () => {
  const [textToEncrypt, setTextToEncrypt] = useState('');

  const handletextToEncrypt = (evt) => setTextToEncrypt(evt.target.value);

  function handleOpenFile() {
    electron.jp.selectFile();
  }
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    electron.jp.sendData(textToEncrypt);
  };

  return (
    <div>
      <button type="button" onClick={handleOpenFile}>
        Select a file to encrypt
      </button>
      <button type="button" onClick={handleOpenFile}>
        Select a file to decrypt
      </button>
      <p> Nothing hidden yet!</p>

      <form id="encrypt-form" onSubmit={handleSubmit}>
        <label htmlFor="textToEncrypt">Text to encrypt: </label>
        <input name="textToEncrypt" onChange={handletextToEncrypt} value={textToEncrypt} />

        <button type="submit" className="submit-btn">
          Save Data
        </button>
      </form>
    </div>
  );
};

export default Crypt;
