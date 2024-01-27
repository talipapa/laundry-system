
const CanvasRestriction = ({children, className}: any) => {
const canvasRestriction = "xl:w-[1500px] mx-auto w-full h-full"
  return (
    <div className={`${canvasRestriction} ${className}`}>
        {children}
    </div>
  )
}

export default CanvasRestriction