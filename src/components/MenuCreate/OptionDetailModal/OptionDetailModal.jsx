import Modal from "../../Modal";
import SelectedOptionInput from "./SelectedOptionInput";

const OptionDetailModal = () => {

  const selectedOptionModalStyle = {
    height: "50%",
    width: "60%",
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