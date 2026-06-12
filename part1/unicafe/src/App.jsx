import { useState } from "react";

// single statistic line component to display a single statistic
const StatisticLine = ({ text, value }) => {
  console.log(
    "StatisticLine component rendered with text:",
    text,
    "value:",
    value,
  );
  return (
    <p>
      {text} {value}
    </p>
  );
};

// statistics component to display feedback statistics
const Statistics = ({ good, neutral, bad }) => {
  console.log(
    "Statistics component rendered with good:",
    good,
    "neutral:",
    neutral,
    "bad:",
    bad,
  );
  // extra statistics
  const total = good + neutral + bad;
  // get the average
  let average = 0;
  if (total > 0) {
    // calculate average feedback using good as +1, neutral as 0, and bad as -1
    average = (good - bad) / total;
  }
  // calculate percentage of positive feedback
  let positivePercentage = 0;
  if (total > 0) {
    positivePercentage = (good / total) * 100;
  }

  // only render statistics if there is at least one feedback given, otherwise show "No feedback given"
  if (total > 0) {
    // render statistics with total, average, and positive percentage
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="total" value={total} />
        <StatisticLine text="average" value={average.toFixed(2)} />
        <StatisticLine
          text="positive"
          value={positivePercentage.toFixed(2) + "%"}
        />
      </div>
    );
  } else {
    // render "No feedback given" if there is no feedback
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  }
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // event handlers for each button giving feedback
  const handleGoodClick = () => {
    console.log("good feedback clicked", good);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    console.log("neutral feedback clicked", neutral);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    console.log("bad feedback clicked", bad);
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
