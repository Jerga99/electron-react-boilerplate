import React, { useState } from 'react';

const Crypt = () => {
  const [textToEncrypt, setTextToEncrypt] = useState('');
  const [textFromFile, setTextFromFile] = useState('');

  const handletextToEncrypt = (evt) => setTextToEncrypt(evt.target.value);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    electron.jp.sendData(textToEncrypt);
  };
  const handleOpen = async (evt) => {
    const encryptedData = await electron.jp.openFile();
    setTextFromFile(encryptedData);
  };

  return (
    <div>
      <p>Unencrypted text:{textFromFile}</p>
      <form id="encrypt-form" onSubmit={handleSubmit}>
        <label htmlFor="textToEncrypt">Text to encrypt: </label>
        <input name="textToEncrypt" onChange={handletextToEncrypt} value={textToEncrypt} />

        <button type="submit" className="submit-btn">
          Save Data
        </button>
      </form>
      <button type="button" onClick={handleOpen}>
        open file
      </button>
    </div>
  );
};

export default Crypt;
