import logo from "./logo.svg";
import "./App.css";
import cardsData from "./cardsData.json";
import CardList from "./components/CardList";
import axios from "axios";

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
    <div>
      <CardList cardsData={cardsData} />
    </div>
  );
}

export default App;
