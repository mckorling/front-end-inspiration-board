import Card from "./Card";

const CardList = (props) => {
  const allCards = props.cardsData.map((card) => {
    return (
      <Card
        key={card.card_id}
        card_id={card.card_id}
        board_id={card.board_id}
        message={card.message}
        likes={card.likes}
        deleteOneCardCallback={props.deleteOneCardCallback}
        likeOneCardCallback={props.likeOneCardCallback}
      />
    );
  });
  return <section>{allCards}</section>;
};

export default CardList;
