import "./App.css";
import cardsData from "./cardsData.json";
import CardList from "./components/CardList";
import axios from "axios";
import CardForm from "./components/CardForm";
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

  // const createNewBoard = (newBoard) => {
  //   axios
  //     .post(`${URL}/boards`, newBoard)
  //     .then((response) => {
  //       newBoard.id = response.data.id;
  //       let newBoardData = [...boardData];
  //       newBoardData.push(newBoard);
  //       setBoardData(newBoardData);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const selectBoard = (board) => {
    setChosenBoard(board);
  };

  // const showChosenBoard = (board_id, title) => {
  //   axios
  //     .get(`${URL}/boards/${board_id}/cards`)
  //     .then((response) => {
  //       setChosenBoard(response.data.board.title);
  //       // need syntax for updating text content of title here
  //       // this will display the title in the area we want on our page
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const createBoardList = () => {
    //   const boardTitles = boardData.map((board) => {
    //     return (
    //       <li>
    //         <Board title={board.title} />
    //       </li>
    //     );
    //   });
    // };
    let boardList = [];
    for (let board of boardData) {
      boardList.push(
        // <Board
        // key={board.board_id}
        // id={board.board_id}
        board.title
        // owner={board.owner}
        // cards={cardsData}
        // showChosenBoard={showChosenBoard}
        //   // a function that create a new card
        // />
      );
      console.log(boardList);
    }
    return boardList.map((board) => (
      <li>
        {/* {board} */}
        <Board board={board} onBoardSelect={selectBoard}></Board>
      </li>
    ));
  };

  // const getBoards = () => {
  //   axios
  //     .get("https://team-green-inspo.herokuapp.com/boards")
  //     .then((response) => {
  //       const newBoards = response.data.map((board) => {
  //         return {
  //           id: board.id,
  //           title: board.title,
  //           owner: board.owner,
  //         };
  //       });
  //       setBoardData(newBoards);
  //     })
  //     .catch((error) => {
  //       console.log("Error", error);
  //     });
  // };

  return (
    <main>
      <section>
        <h2>Boards</h2>
        <ul>{createBoardList()}</ul>
      </section>
      <section>
        <h2>Selected Board</h2>
        <p>
          {selectBoard.board_id
            ? `${selectBoard.title} - ${selectBoard.owner}`
            : "Please select a board"}
        </p>
      </section>
      {/* <section>{showChosenBoard()}</section> */}
      <div>
        <CardList cardsData={cardData} deleteOneCardCallback={deleteOneCard} />
      </div>
      <CardForm createNewCardCallback={createNewCard}></CardForm>
    </main>
  );
}

export default App;
