import styles from "./customLayout.module.css";

interface CustomLayoutProps {
  children: React.ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Custom Layout Header</h1>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default CustomLayout;
