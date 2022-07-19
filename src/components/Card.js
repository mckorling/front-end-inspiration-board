import "./Card.css";

const Card = (props) => {
  return (
    <section className="one-card">
      <p>{props.message}</p>
      <p>{props.likes}</p>
      <button
        onClick={() => {
          props.likeOneCardCallback(props.card_id);
        }}
      >
        Like
      </button>
      <button
        onClick={() => {
          props.deleteOneCardCallback(props.card_id);
        }}
      >
        Delete
      </button>
    </section>
  );
};

export default Card;
