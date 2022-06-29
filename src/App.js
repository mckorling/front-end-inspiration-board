import "./App.css";
import cardsData from "./cardsData.json";
import CardList from "./components/CardList";
import CardForm from "./components/CardForm";

function App() {
  return (
    <main>
      <div>
        <CardList cardsData={cardsData} />
      </div>
      <CardForm></CardForm>
    </main>
  );
}

export default App;
