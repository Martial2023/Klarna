import { Square } from 'ldrs/react'
import 'ldrs/react/Square.css'

const MinLoader = () => {
    return (
        <div>
            <div className='dark:hidden'>
                <Square
                    size="35"
                    stroke="5"
                    strokeLength="0.25"
                    bgOpacity="0.1"
                    speed="1.2"
                    color="black"
                />
            </div>
            <div className='hidden dark:block'>
                <Square
                    size="35"
                    stroke="5"
                    strokeLength="0.25"
                    bgOpacity="0.1"
                    speed="1.2"
                    color="white"
                />
            </div>
        </div>

    )
}

export default MinLoader