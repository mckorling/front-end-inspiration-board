import "./App.css";
import cardsData from "./cardsData.json";
import CardList from "./components/CardList";
import axios from "axios";
import CardForm from "./components/CardForm";
import { useEffect, useState } from "react";

function App() {
  const [boardData, setBoardData] = useState([]);
  const [cardData, setCardData] = useState(cardsData);
  // Don't need useEffect for cardData because it only loads when a board is selected

  // hardcode board_id here, need to be updated
  useEffect((board_id) => {
    getCardDataFromAPI(2);
  }, []);

  // API like count is undefined. need to check back end code
  const createNewCard = ({ message, board_id }) => {
    axios
      .post(`https://team-green-inspo.herokuapp.com/boards/${board_id}/cards`, {
        message: message,
      })
      .then((response) => {
        console.log("making new card");
        const nextId = cardData.slice(-1)[0].card_id + 1;
        const newCard = {
          card_id: nextId,
          board_id: board_id,
          message: message,
          likes_count: 0,
        };
        const newCardData = [...cardData];
        newCardData.push(newCard);
        setCardData(newCardData);
      })
      .catch((error) => {
        console.log(error);
        alert("Couldn't make new card. Enter a message.");
      });
  };

  const deleteOneCard = (card_id) => {
    axios
      .delete(`https://team-green-inspo.herokuapp.com/cards/${card_id}`)
      .then(() => {
        const newCardData = cardData.filter((card) => card_id !== card.card_id);
        setCardData(newCardData);
      })
      .catch((error) => {
        alert("Couldn't delete card. Please refresh and try again.");
        console.log("delete fail");
        console.log(error);
      });
  };

  const getCardDataFromAPI = (board_id) => {
    axios
      .get(`https://team-green-inspo.herokuapp.com/boards/${board_id}/cards`)
      .then((response) => {
        setCardData(response.data.cards);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <CardList cardsData={cardData} deleteOneCardCallback={deleteOneCard} />
      </div>
      <CardForm createNewCardCallback={createNewCard}></CardForm>
    </main>
  );
}

export default App;
