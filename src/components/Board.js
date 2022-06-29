import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import "./Board.css";

// const [board, setBoard] = useState({title:"",id:None, owner=""})
const Board = (props) => {
  const boardId = props.id;
  const boardTitle = props.title;
  const boardOwner = props.owner;
};

Board.PropTypes = {
  boardId: PropTypes.number.isRequired,
  boardTitle: PropTypes.string.isRequired,
  boardOwner: PropTypes.string.isRequired,
};

export default Board;
