import css from "./RegisterPage.module.css";
import LoginForm from "../../components/RegistrationForm/LoginForm";

export default function LoginPage() {
  return (
    <section className={css.registerContainer}>
      <LoginForm />
    </section>
  );
}
