import { Button } from 'react-onsenui';
import { useDispatch } from 'react-redux';
import { showPrev } from '../slice';

export default function PrevButton() {
  const dispatch = useDispatch();

  const onClick = () => dispatch(showPrev());

  return (
    <Button
      onClick={onClick}
      className="btn-prev"
      modifier="quiet"
    >
      prev
    </Button>
  );
}
