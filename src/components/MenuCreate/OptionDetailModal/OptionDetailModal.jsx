import Modal from "../../Modal";
import SelectedOptionInput from "./SelectedOptionInput";

const OptionDetailModal = () => {

  const selectedOptionModalStyle = {
    height: 450,
    width:900,
    flexDirection: "column"
  };

  return (
    <Modal 
    height={selectedOptionModalStyle.height}
    width={selectedOptionModalStyle.width}
    flexDirection={selectedOptionModalStyle.flexDirection}
  >
    <SelectedOptionInput/>
  </Modal>
  );
}

export default OptionDetailModal;