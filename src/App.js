import "./App.css";
import cardsData from "./cardsData.json";
import CardList from "./components/CardList";
import axios from "axios";
import CardForm from "./components/CardForm";

function App() {
  const [boardData, setBoardData] = useState([]);

  const getBoards = () => {
    axios
      .get("https://team-green-inspo.herokuapp.com/boards")
      .then((response) => {
        const newBoards = response.data.map((board) => {
          return {
            id: board.id,
            title: board.title,
            owner: board.owner,
          };
        });
        setBoardData(newBoards);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
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
