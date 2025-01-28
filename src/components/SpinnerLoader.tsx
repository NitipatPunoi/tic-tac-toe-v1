import FadeLoader from 'react-spinners/FadeLoader'

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-primary text-spinnerLoader">
      <FadeLoader color="#8ca0f0" aria-label="Loading Spinner" data-testid="loader" />
    </div>
  )
}

export default SpinnerLoader
