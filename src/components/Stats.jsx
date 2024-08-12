export default function Stats({ stats }) {
  return (
    <section className="stats">
      <Stat label="words" number={stats.numberOfWords} />
      <Stat label="characters" number={stats.numberOfCharacters} />
      <Stat label="instagram" number={stats.instagramCharactersLeft} />
      <Stat label="facebook" number={stats.facebookCharactersLeft} />
    </section>
  );
}

function Stat({ label, number }) {
  return (
    // 평상시에는 stat__number이지만, number가 0보다 작을 때는 stat__number의 폰트색상을
    // stat__number--limit의 색상으로 덮어씌워서 빨간색으로 변경합니다.
    <section className="stat">
      <span
        className={`stat__number ${number < 0 ? "stat__number--limit" : ""}`}
      >
        {number}
      </span>
      <h2 className="second-heading">{label}</h2>
    </section>
  );
}
