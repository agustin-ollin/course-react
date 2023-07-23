import { useEffect, useState } from 'react'

const FollowMoues = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  // pointer move
  useEffect(() => {
    console.log('Effect ', { enabled })
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // cleanup
    // -> cuando el componente se desmonta
    // -> cuando cambia las dependencias, antes de ejecutar el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)
  
    return () => {
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])
  

  return (
    <>
      <div
        style={{
          position: 'absolute',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          border: '1px solid #fff',
          borderRadius: '50%',
          opacity: 0.8,
          pointerEvents: 'none',
          left: -25,
          top: -25,
          width: 50,
          height: 50,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMoues />
    </main>
  )
}

export default App
