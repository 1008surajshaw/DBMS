import loginImg from "../assets/images/download (1).jpeg"
import Template from "../components/Template"

export default function Login ()  {
  return (
    <Template
    title="welcome back"
    formType="login"
    description1="Welcome back! Let’s continue your search."
    description2="Things you Can Do with
Dumy Account."
    image={loginImg}
    >

    </Template>
  )
}
