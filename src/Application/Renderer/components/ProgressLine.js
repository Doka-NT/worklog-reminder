import { ProgressBar } from "react-onsenui";

const styles = {
  wrapper: {
    background: "#FFFFFF",
    height: 2,
  },
};

export default function ProgressLine(props) {
  const isVisible = props.isVisible;

  return (
    <div style={styles.wrapper}>
      <ProgressBar
        style={{ display: isVisible ? "block" : "none" }}
        indeterminate={true}
      />
    </div>
  );
}
