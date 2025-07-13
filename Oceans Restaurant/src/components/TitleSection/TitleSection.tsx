import styles from './TitleSection.module.scss'

interface TitleSectionProps {
  title: string;
}

function TitleSection({ title }: TitleSectionProps) {
  return (
    <>
    <div className={styles.container}>
      <div className={styles.title_section}>
        <h1>{title}</h1>
      </div>
      <hr />
    </div>
    </>
  )
}

export default TitleSection