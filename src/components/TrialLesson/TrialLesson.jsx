import React, { useEffect } from "react";
import css from "./TrialLesson.module.css";
import { closeModal } from "../../redux/modal/slice";
import { selectActiveModal } from "../../redux/modal/selectors";
import { useDispatch, useSelector } from "react-redux";
import FeedbackForm from "../FeedbackForm/FeedbackForm";

export default function TrialLesson({ teacher }) {
  const { name, surname, avatar_url } = teacher;
  const dispatch = useDispatch();

  const activeModal = useSelector(selectActiveModal);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    if (activeModal) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  if (activeModal !== "langLevel") return null;

  return (
    <div className={css.modalOverlay} onClick={handleClose}>
      <div className={css.modalContent} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className={css.closeButton}>
          <svg width="32" height="32" className={css.imgClosed}>
            <use href="/sprite.svg#icon-x"></use>
          </svg>
        </button>
        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.description}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.teacher}>
          <img
            className={css.avatar}
            width={96}
            src={avatar_url}
            alt="Teacher's avatar"
          />
          <div className={css.teacherName}>
            <p className={css.yurTeacher}>Your teacher</p>
            <p className={css.name}>
              {name} {surname}
            </p>
          </div>
        </div>
        <h3 className={css.question}>
          What is your main reason for learning English?
        </h3>
        <FeedbackForm handleClose={handleClose} />
      </div>
    </div>
  );
}
