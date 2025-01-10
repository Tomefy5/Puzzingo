import BasicLayout from "../layouts/BasicLayout";
import AreaGame from '../components/AreaGame/AreaGame'

export default function GamePage() {
  return (
    <div className="min-h-[100vh] flex">
        <BasicLayout>
          <AreaGame />
        </BasicLayout>
    </div>
  )
}
