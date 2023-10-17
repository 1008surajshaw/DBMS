import signupImg from "../assets/images/listing-brochures-virtuance-real-estate-photography-1024x683.jpg"
import Template from "../components/Template"

function Signup() {
  return (
    <Template
      title="Welcome back! Let’s continue your search"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Things you Can Do with
dummy Account"
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup