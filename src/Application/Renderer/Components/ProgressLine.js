import { ProgressBar } from 'react-onsenui';

const styles = {
  wrapper: {
    background: 'transparent',
    height: 2,
    position: 'relative',
    zIndex: 5,
  },
};

export default function ProgressLine(props) {
  const { isVisible } = props;

  return (
    <div style={styles.wrapper}>
      <ProgressBar
        style={{ display: isVisible ? 'block' : 'none' }}
        indeterminate
      />
    </div>
  );
}
