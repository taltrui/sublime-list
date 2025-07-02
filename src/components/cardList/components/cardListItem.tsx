import { useNavigate } from "@tanstack/react-router";
import CardContent from "./cardContent";

function CardListItem({ card }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate({ to: `/card/${card.id}` })}>
      <CardContent card={card} />
    </div>
  );
}

export default CardListItem;
