import { useState } from "react";

const AnecdoteWithMostVotes = ({ anecdotes, votes }) => {
  // find the value in the votes array that has the most votes
  const maxVotes = Math.max(...votes);
  console.log("Maximum votes:", maxVotes);
  // find the index of the anecdote with the most votes using maxVotes
  const indexOfMaxVotes = votes.indexOf(maxVotes);
  console.log("Index of anecdote with most votes:", indexOfMaxVotes);

  // if there are no votes, show "No votes given"
  if (maxVotes === 0) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <div>No votes given</div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[indexOfMaxVotes]}
        <br />
        <Votes votes={votes[indexOfMaxVotes]} />
      </div>
    );
  }
};

const Votes = ({ votes }) => {
  console.log("Votes component rendered with votes:", votes);

  if (votes === 0) {
    return <div>has no votes</div>;
  } else if (votes === 1) {
    return <div>has 1 vote</div>;
  } else {
    return <div>has {votes} votes</div>;
  }
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  // vote button click handler
  const handleVote = () => {
    console.log("Vote button clicked for anecdote index:", selected);
    // make a copy of the votes array
    const newVotes = [...votes];
    // increment the vote count for the currently selected anecdote
    newVotes[selected] += 1;
    // update the votes state with the new votes array
    setVotes(newVotes);
  };
  // next anectode button click handler
  const handleNextAnecdote = () => {
    // get random value from our array
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    // set the new random index as the selected anecdote
    setSelected(randomIndex);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      <Votes votes={votes[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <AnecdoteWithMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  );
};

export default App;
