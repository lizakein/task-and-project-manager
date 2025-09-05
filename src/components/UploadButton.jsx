import UploadImgaeIcon from "../assets/icons/ui/upload-image-icon.svg";

export function UploadButton() {
  return (
    <button type="button" className="button upload-button"> 
      <img src={UploadImgaeIcon} alt="" role="presentation" className="button__icon" />
      <span className="button__text">Upload Image</span>
    </button>
  );
}