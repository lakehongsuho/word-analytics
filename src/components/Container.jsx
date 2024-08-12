import { useState } from "react";
import Stats from "./Stats";
import TextArea from "./TextArea";
import {
  INSTAGRAM_MAX_CHARACTERS,
  FACEBOOK_MAX_CHARACTERS,
} from "../constants";

export default function Container() {
  const [text, setText] = useState("");
  const stats = {
    numberOfCharacters: text.length,
    numberOfWords: text.split(/\s/).filter((word) => word !== "").length,
    instagramCharactersLeft: INSTAGRAM_MAX_CHARACTERS - text.length,
    facebookCharactersLeft: FACEBOOK_MAX_CHARACTERS - text.length,
  }; // Stats 컴포넌트로 전달해야 하는 프롭스가 많으니 오브젝트로 묶어서 전달, 애초에 선언부터 오브젝트로 선언

  return (
    <main className="container">
      <TextArea text={text} setText={setText} />
      <Stats stats={stats} />
    </main>
  );
}
