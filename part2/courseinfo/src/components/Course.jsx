import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  // calculate total exercises using the parts array and reduce method
  const totalExercises = course.parts.reduce(
    (sum, part) => sum + part.exercises,
    0,
  );

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default Course;
