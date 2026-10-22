const LanguagesList = ({ languages }) => {
  if (!languages) return null;

  return (
    <div>
      <h3>Languages</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
    </div>
  );
};

export default LanguagesList;
