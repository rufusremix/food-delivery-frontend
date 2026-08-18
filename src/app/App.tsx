import { Button } from '@/components/ui/button'
import { useState } from 'react'

function App() {
  console.log('Rendering App component')
  const [count, setCount] = useState(0)

  if (count < 5) setCount(count + 1)

  console.log('Count value:', count) // Log the current value of count
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-blue-600">Tailwind Working</h1>
      <Button>Click me</Button>
    </div>
  )
}

export default App
