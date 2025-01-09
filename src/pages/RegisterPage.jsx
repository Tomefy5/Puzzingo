import RegisterForm from "../components/RegisterForm/RegisterForm";
import BasicLayout from "../layouts/BasicLayout";

export default function RegisterPage() {
  return (
    <div className="min-h-[100vh] flex">
        <BasicLayout>
          <RegisterForm/>
        </BasicLayout>
    </div>
  )
}
