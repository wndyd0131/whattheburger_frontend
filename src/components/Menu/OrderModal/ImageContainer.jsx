import { useContext } from 'react'
import { OptionContext } from './contexts/OptionContext';

const ImageContainer = () => {
  const {
    option
  } = useContext(OptionContext);
  
  return (
    <motion.div 
      className="relative flex justify-center items-center min-h-[160px] w-full bg-gradient-to-br from-gray-50 to-white overflow-hidden"
    >
      <motion.img 
        className="w-[140px] h-[140px] object-cover rounded-xl shadow-sm"
        src={option.imageSource} 
        alt={option.optionName}
      />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
    </motion.div>
  )
}

export default ImageContainer;