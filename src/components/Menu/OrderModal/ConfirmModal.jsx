
const ConfirmModal = ({setConfirmModalOpened, message, handlerFunction}) => {

  const modalStyle = {
    height: 300,
    width: 450,
    flexDirection: "column"
  }

  return (
    <Modal
      height={modalStyle.height}
      width={modalStyle.width}
      flexDirection={modalStyle.flexDirection}
      position={modalStyle.position}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col justify-center items-center p-8 space-y-6"
      >
        <div className="flex justify-center items-center w-16 h-16 bg-orange-100 rounded-full">
          <svg className="w-8 h-8 text-[#FE7800]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2 font-['Whatthefont']">Confirm Action</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        
        <div className="flex justify-center items-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#FE7800] to-orange-500 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-['Whatthefont']"
            onClick={() => handlerFunction()}
          >
            Yes
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-['Whatthefont'] hover:bg-gray-300"
            onClick={() => setConfirmModalOpened(false)}
          >
            No
          </motion.button>
        </div>
      </motion.div>
    </Modal>
  );
}

export default ConfirmModal;