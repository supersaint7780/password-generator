import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [hasNumbers, setHasNumber] = useState(true);
  const [hasSpecialCharacters, setHasSpecialCharacter] = useState(false);
  const [password, setPassword] = useState("");

  // ref hook
  const passwordRef = useRef(null);


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (hasNumbers) {
      str += "1234567890";
    }

    if (hasSpecialCharacters) {
      str += "@#$%^&*<>?[]{}|;.,";
    }

    for (let i = 1; i <= passwordLength; i++) {
      let charIndex = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(charIndex);
    }

    setPassword(pass);

  }, [passwordLength, hasNumbers, hasSpecialCharacters, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordLength, hasNumbers, hasSpecialCharacters, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-[36rem] rounded-lg mx-auto p-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            name=""
            id=""
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >Copy</button>
        </div>
        <div className="flex text-sm gap-x-3">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              name=""
              id=""
              min={6}
              max={40}
              step={1}
              value={passwordLength}
              className="cursor-pointer"
              onChange={(e) => { setPasswordLength(e.target.value) }}
            />
            <label>Length:{passwordLength}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={hasNumbers}
              id="numberInput"
              onChange={() => {
                setHasNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={hasSpecialCharacters}
              id="numberInput"
              onChange={() => {
                setHasSpecialCharacter((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
