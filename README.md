# word-analytics

> word-analytics는 텍스트 분석 웹사이트입니다. 글자 수와 단어 수를 분석하고, 소셜 미디어 플랫폼에 맞는 글자 제한을 보여주는 기능을 제공합니다.

```jsx
D:\DEV\NEXTJS\BYTEGRAD\WORD-ANALYTICS\SRC
|   index.css
|   main.jsx
|
+---components
|       App.jsx
|       BackgroundImage.jsx
|       Container.jsx
|       Footer.jsx
|       H1.jsx
|       Header.jsx
|       Stats.jsx
|       TextArea.jsx
|       Warning.jsx
|
\---lib
        constants.js
```

33

- vite로 리액트 생성하기
  - `npm create vite@4.4.1 .`
- 설치
  - `npm install`
- 시작
  - `npm run dev`

35

- **컨트롤된 텍스트에리아**

  - 인풋이나 텍스트에리아로 다루어지는 텍스트는 전부 내부적으로 브라우저가 아니라 리액트로 컨트롤되어야 한다. 텍스트를 효과적으로 다룰 수 있기 때문이다. text를 다른 컴포넌트로 보내거나 받을 수 있게 된다. 유저가 script 태그를 텍스트에리아에 입력하는 경우 validation를 거쳐 문제가 되는 요소를 검증할 때도 컨트롤된 텍스트만 가능하다.

    ```jsx
    import { useState } from "react";

    export default function TextArea() {
      const [text, setText] = useState("");

      return (
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="textarea"
          placeholder="enter your text"
          spellCheck="false"
        />
      );
    }
    ```

36

- **텍스트 벨리데이션**

  - 사용자가 텍스트에리아나 인풋을 통해 `<script>`태그나 `<iframe>`태그를 입력하여 xss 공격을 할 수가 있다. 더 다양한 xss 공격 방식이 있는데, 지금은 유효성 검사를 해줘야 한다는 개념만 알아가자.

    ```jsx
    import { useState } from "react";
    import Warning from "./Warning";

    export default function TextArea() {
      const [text, setText] = useState("");
      const [warningText, setWarningText] = useState("");

      const handleChange = (e) => {
        let newText = e.target.value;

        // alert로 경고해주는 건 ux측면에서 좋지 않아서, <script>를 삭제하고 경고글 렌더링
        if (newText.includes("<script>")) {
          setWarningText("no script tag allowed");
          newText = newText.replace("<script>", "");
        } else {
          setWarningText("");
        }

        setText(newText);
      };

      return (
        // fragment대신 div를 이용하면 레이아웃이 변경된다.
        // Warning은 디폴트로 엠티 스트링, 문제가 있을 때만 렌더링.
        <>
          <textarea
            value={text}
            onChange={handleChange}
            className="textarea"
            placeholder="enter your text"
            spellCheck="false"
          />
          <Warning warningText={warningText} />
        </>
      );
    }
    ```

42

- **Derived State**

  - 글자수를 계산하는 스테이트를 useState로 따로 만들지 않는다. 이미 스테이트로 존재하는 text에서 크기만 계산하는 스테이를 만들면 된다. 글자 수는 변경될 때마다 리렌더링이 필요하지 않은 스테이트다. 기존의 스테이트에서 파생시켜 사용하면 자원적 측면에서 좋은 방식이다.

    ```jsx
    export default function TextArea() {
      const [text, setText] = useState("");
      const [warningText, setWarningText] = useState("");
      // useState를 사용하지 않아도 된다
      const numberOfCharacters = text.length;
    ```

44

- **어레이에 필터 적용하기**

  - text를 스페이스바 기준으로 나누고 배열을 만드는데, 그 배열의 요소는 “” 공백이 없어야 하고, 완성된 배열의 크기를 리턴한다.
  - “Hello World” → [”Hello”, “”, “World”] → [”Hello”, “World”]
  - filter()는 조건에 따라 true 아니면 false를 리턴한다. “Hello”와 “World”에 대해서 true를 리턴하고, “”은 false를 리턴한다.

    ```jsx
    const numberOfWords = text.split(/\s/).filter((word) => word !== "").length;
    ```

45

- **프롭스를 하나의 오브젝트 담아서 전달하기**

  - 여러개의 프롭스를 하나의 오브젝트에 담아서 보내면 보기 편하다. 애초에 선언조차 오브젝트에서 해주면 더욱 좋은 코드가 된다.

    ```jsx
    // 이전 코드
    import { useState } from "react";
    import Stats from "./Stats";
    import TextArea from "./TextArea";

    export default function Container() {
      const [text, setText] = useState("");
      const numberOfCharacters = text.length;
      const numberOfWords = text.split(/\s/).filter((word) => word !== "").length;
      const instagramCharactersLeft = 280 - numberOfCharacters;
      const facebookCharactersLeft = 2200 - numberOfCharacters;

      return (
        <main className="container">
          <TextArea text={text} setText={setText} />
          <Stats
            numberOfCharacters={numberOfCharacters}
            numberOfWords={numberOfWords}
            instagramCharactersLeft={instagramCharactersLeft}
            facebookCharactersLeft={facebookCharactersLeft}
          />
        </main>
      );
    }

    // 수정 코드
    import { useState } from "react";
    import Stats from "./Stats";
    import TextArea from "./TextArea";

    export default function Container() {
      const [text, setText] = useState("");
      const stats = {
        numberOfCharacters: text.length,
        numberOfWords: text.split(/\s/).filter((word) => word !== "").length,
        instagramCharactersLeft: 280 - text.length,
        facebookCharactersLeft: 2200 - text.length,
      };
      return (
        <main className="container">
          <TextArea text={text} setText={setText} />
          <Stats stats={stats} />
        </main>
      );
    }
    ```

---
