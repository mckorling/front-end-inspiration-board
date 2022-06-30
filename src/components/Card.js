const Card = (props) => {
  return (
    <section>
      <p>{props.message}</p>
      <p>{props.likes_count}</p>
      <button>Like</button>
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
