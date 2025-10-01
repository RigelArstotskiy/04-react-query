//Import
import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

//Interface
interface OrderFormProps {
  onSubmit: (value: string) => void;
}

//SearchBar
export default function SearchBar({ onSubmit }: OrderFormProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (query === "") {
      toast("Please enter your search query.");
      return;
    }
    onSubmit(query);
  };

  //Render
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />

          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
