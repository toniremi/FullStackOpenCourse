const Header = (props) => {
  console.log(props);
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  console.log(props);
  return (
    <div>
      {props.parts.map((part, index) => (
        <p key={index}>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  );
};

const App = () => {
  // course titlle
  const course = "Half Stack application development";
  // course parts into an array
  const parts = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  // calculate total exercises
  let totalExercises = 0;
  for (let i = 0; i < parts.length; i++) {
    totalExercises += parts[i].exercises;
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <p>Number of exercises {totalExercises}</p>
    </div>
  );
};

export default App;
