interface ButtonInterface {
  title: string;
  cls: string;
  handler?: () => void
}
export function Button({title, cls, handler}: ButtonInterface) {

  return (
    <button onClick={handler} className={`${cls}`}>{title}</button>
  )
}