import "./App.css";
import styles from "./app.module.css";
import { useState } from "react";
import { v4 } from "uuid";
import Experiences from "./components/experienceList";

function App() {
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [border, setBorder] = useState("");

  const handleClick = () => {
    if (companyName === "") {
      setBorder("redBorder");
      return;
    } else {
      if (border === "redBorder") setBorder("");
      const experience = {
        companyName,
        jobTitle,
        id: v4(),
      };
      setExperiences((prevExperiences) => [...prevExperiences, experience]);
      document.getElementById("cN").value = "";
      document.getElementById("jT").value = "";
      setCompanyName("");
      setJobTitle("");
    }
  };

  const updateById = (id, cName, jTitle) => {
    let experiences_copy = [...experiences];
    let experience = experiences_copy.find(
      (experience) => experience.id === id
    );
    let index = experiences_copy.indexOf(experience);
    if (cName !== "") experience.companyName = cName;

    if (jTitle !== "") experience.jobTitle = jTitle;
    let newExperiences = experiences_copy.filter(
      (experience) => experience.id !== id
    );
    newExperiences.splice(index, 0, experience);
    setExperiences(newExperiences);
  };
  return (
    <>
      <div className={styles.container}>
        <h1>EMPLOYEE EXPERIENCE RECORD</h1>
        <div className={styles.form}>
          <input
            placeholder="Enter company name"
            type="text"
            required
            onChange={(e) => setCompanyName(e.target.value)}
            className={border === "redBorder" ? styles.redBorder : ""}
            id="cN"
          ></input>
          <input
            placeholder="Enter job title"
            type="text"
            onChange={(e) => setJobTitle(e.target.value)}
            id="jT"
          ></input>
          <button onClick={handleClick}>Add experience</button>
        </div>
        <Experiences experiences={experiences} updateById={updateById} />
      </div>
    </>
  );
}

export default App;
