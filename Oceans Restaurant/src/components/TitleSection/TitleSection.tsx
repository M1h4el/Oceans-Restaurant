import styles from "./TitleSection.module.scss";

interface TitleSectionProps {
  title: string;
}

function TitleSection({ title }: TitleSectionProps) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title_section}>
          <div className={styles.actions}>
            <h1>{title}</h1>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
}

export default TitleSection;
