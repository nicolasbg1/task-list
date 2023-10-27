import { FaFaceFrown } from 'react-icons/fa6'
export function NotTask() {
  return (
    <div className="not-task">
      <p>Sem atividades no momento</p>
      <span className="icon">
        <FaFaceFrown />
      </span>
    </div>
  )
}
