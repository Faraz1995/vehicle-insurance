import { useState } from 'react'
import Button from './components/Button'
import { PlateInputs } from './components/PlateInput'
import axiosInstance from './utils/axios'

function App() {
  const [plate, setPlate] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const searchHandler = () => {
    setIsLoading(true)
    axiosInstance.get(`/api/inquiry/plate/${plate}`).then((res) => {
      console.log(res)
      setIsLoading(false)
    })
  }

  return (
    <div className='flex flex-col p-4 gap-4 w-full h-full items-center justify-center border border-amber-500'>
      <div className='flex items-center gap-2'>
        <div className='max-w-md'>
          <PlateInputs
            value={plate}
            onChange={(combined) => {
              setPlate(combined)
            }}
          />
        </div>
        <Button loading={isLoading} disabled={!plate} onClick={searchHandler}>
          <p>جستجو</p>
        </Button>
      </div>
    </div>
  )
}

export default App
