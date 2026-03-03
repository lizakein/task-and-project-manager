import UploadImgaeIcon from "@assets/icons/ui/upload-image-icon.svg";
import { Button, Icon } from "@ui/index";

export function UploadButton() {
  return (
    <Button
      type="button"
      className="upload-button"
      leftIcon={<Icon src={UploadImgaeIcon} />}
    >
      <span className="button__text">Upload Image</span>
    </Button>
  );
}
