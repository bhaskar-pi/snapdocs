import styles from "./styles.module.css";

interface Props {
  title: string;
  description: string;
}
const SectionHeader = ({ title, description }: Props) => {
  return (
    <div className={styles.stepHeader}>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default SectionHeader;
