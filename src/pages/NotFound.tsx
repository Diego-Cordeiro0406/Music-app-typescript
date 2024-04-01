import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = () => {
      navigate('/')
    }
    setTimeout(redirect, 5000)
  }, [navigate])

  return (
    <section
      className="
        flex
        justify-center
        items-center
        w-screen
        h-screen
        border-none
        bg-cover
        bg-center
        bg-login-background"
    >
      <section
        className="
          flex
          mobile:flex-col
          laptop:flex-row
          justify-center
          items-center
          font-['Epilogue']
        "
        >
        <h1 className="m-0 mobile:text-8xl laptop:text-9xl text-[#003BE5]">Ops!</h1>
        <h3
          className="
            laptop:ml-8
            mobile:text-lg
            laptop:text-3xl
            max-w-80
            text-[#00D5E2]
            mobile:text-center
          "
        >
          A página que você está procurando não foi encontrada.
        </h3>
      </section>
      
    </section>
  )
}

export default NotFound;