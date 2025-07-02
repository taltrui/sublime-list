import { useNavigate } from "@tanstack/react-router";
import CardContent from "./cardContent";

function CardListItem({ card }) {
	const navigate = useNavigate();
	return (
		<button
			type="button"
			onClick={() => navigate({ to: `/card/${card.id}` })}
			className="w-full text-left"
		>
			<CardContent card={card} />
		</button>
	);
}

export default CardListItem;
