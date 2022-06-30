import React from "react";
import PropTypes from "prop-types";
import "./Board.css";

// const [board, setBoard] = useState({title:"",id:None, owner=""})
const Board = (props) => {
  return (
    <div onClick={() => props.onBoardSelect(props.board)}>{props.board}</div>
  );
};
export default Board;
