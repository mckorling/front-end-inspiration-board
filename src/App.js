import "./App.css";
import cardsData from "./cardsData.json";
import CardList from "./components/CardList";
import axios from "axios";
import CardForm from "./components/CardForm";
import BoardForm from "./components/BoardForm";
import { useState, useEffect } from "react";
import Board from "./components/Board";

function App() {
  const URL = "https://team-green-inspo.herokuapp.com";
  const [boardData, setBoardData] = useState([]);
  const [chosenBoard, setChosenBoard] = useState({});
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

  useEffect(() => {
    axios
      .get(`${URL}/boards`)
      .then((response) => {
        setBoardData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const createNewBoard = (newBoard) => {
    axios
      .post(`${URL}/boards`, newBoard)
      .then((response) => {
        console.log(response)
        newBoard.id = response.data.board.id;
        let newBoardData = [...boardData];
        newBoardData.push(newBoard);
        setBoardData(newBoardData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const selectBoard = (board) => {
    setChosenBoard(board)
  };

  const boardTitles = boardData.map((board) => {
    return (
      <li key = {board.id}>
        <Board board={board} onBoardSelect={selectBoard}></Board>
      </li>
    );
  });

  const [isBoardFormVisible, setIsBoardFormVisible] = useState(true);
  const toggleBoardForm = () => {setIsBoardFormVisible(!isBoardFormVisible)}

  return (
    <body>
      <header>
        <h1>Team Green's Board</h1>
      </header>
      <main>
        <section>
          <h2>Boards</h2>
          <ul>{boardTitles}</ul>
        </section>
        <section>
          <h2>Selected Board</h2>
          <p>
            {chosenBoard.id ? `${chosenBoard.title} - ${chosenBoard.owner}` : 'Please select a board'}
          </p>
        </section>
        <section>
        {isBoardFormVisible ? <BoardForm createBoardCallback = {createNewBoard}></BoardForm> : ''}
        <span onClick={toggleBoardForm}>{isBoardFormVisible ? 'Hide New Board Form' : 'Show New Board Form'}</span>
        </section>
        <div>
          <CardList cardsData={cardData} deleteOneCardCallback={deleteOneCard} />
        </div>
        <CardForm createNewCardCallback={createNewCard}></CardForm>
      </main>
      <footer>
        <p>Made by: Ruge, Megan, Diana, and Lin</p>
      </footer>
    </body>
  );
}

export default App;
