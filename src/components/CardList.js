import Card from "./Card";

const CardList = (props) => {
  const allCards = props.cardsData.map((card) => {
    return (
      <Card
        key={card.card_id}
        card_id={card.card_id}
        board_id={card.board_id}
        message={card.message}
        likes_count={card.likes_count}
      />
    );
  });
  return <section>{allCards}</section>;
};

export default CardList;
