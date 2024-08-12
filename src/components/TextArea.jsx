import { useState } from "react";
import Warning from "./Warning";

export default function TextArea({ text, setText }) {
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
