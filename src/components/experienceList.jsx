import styles from "./experience.module.css";
import { useState } from "react";

export default function Experiences({ experiences, updateById }) {
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [border, setBorder] = useState("");
  const [editId, setEditId] = useState("");
  const handleUpdate = (id) => {
    if (companyName !== "" || jobTitle !== "") {
      if (border === "redBorder") setBorder("");
      updateById(id, companyName, jobTitle);
      setCompanyName("");
      setJobTitle("");
      setEditId("");
    } else if (companyName === "") {
      setBorder("redBorder");
      return;
    }
    setIsEditing(false);
  };

  return (
    <>
      <div>
        {experiences.map((experience) => (
          <div key={experience.id} className={styles.experience}>
            {!isEditing && (
              <p>
                <strong>Company name:</strong> {experience.companyName}
              </p>
            )}
            {isEditing && editId === experience.id && (
              <input
                type="text"
                className={border === "redBorder" ? styles.redBorder : ""}
                defaultValue={experience.companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              ></input>
            )}

            {!isEditing && (
              <p>
                <strong>Job title:</strong> {experience.jobTitle}
              </p>
            )}
            {isEditing && editId === experience.id && (
              <input
                defaultValue={experience.jobTitle}
                type="text"
                onChange={(e) => setJobTitle(e.target.value)}
              ></input>
            )}
            {isEditing && editId === experience.id && (
              <button
                onClick={() => handleUpdate(experience.id)}
                className={styles.update}
              >
                Update
              </button>
            )}
            {!isEditing && (
              <button
                onClick={() => {
                  setEditId(experience.id);
                  setIsEditing(true);
                }}
                className={styles.edit}
              >
                Edit experience
              </button>
            )}
            {isEditing && editId === experience.id && (
              <button
                onClick={() => setIsEditing(false)}
                className={styles.cancelEdit}
              >
                Cancel edit
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
