const Card = (props) => {
  return (
    <section>
      <p>{props.message}</p>
      <p>{props.likes_count}</p>
      <button>Like</button>
      <button>Delete</button>
    </section>
  );
};

export default Card;
