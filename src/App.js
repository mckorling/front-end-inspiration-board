import logo from "./logo.svg";
import "./App.css";
import cardsData from "./cardsData.json";
import CardList from "./components/CardList";

function App() {
  return (
    <div>
      <CardList cardsData={cardsData} />
    </div>
  );
}

export default App;
