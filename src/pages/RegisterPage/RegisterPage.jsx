import css from "./RegisterPage.module.css";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

export default function RegisterPage() {
  return (
    <section className={css.registerContainer}>
      <RegistrationForm />
    </section>
  );
}
