const Course = (props) => {
  const { course } = props;

  // create an array with the number of exercises for each part
  const exercisesCount = course.parts.map((part) => part.exercises);
  // calculate the total number of exercises by summing the exercisesCount array
  let totalExercises = 0;
  for (let i = 0; i < exercisesCount.length; i++) {
    totalExercises += exercisesCount[i];
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  );
};

const Header = (props) => <h1>{props.course}</h1>;

const Content = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

// This component is not needed for now, but it might be used in the next exercises
const Total = (props) => (
  <p style={{ fontWeight: "bold" }}>Total of exercises {props.total}</p>
);

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
