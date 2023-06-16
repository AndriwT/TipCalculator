import ShareIcon from "@mui/icons-material/Share";
import { ReactElement } from "react";
import { RWebShare } from "react-web-share";

interface MyComponentProps {
  url: string;
}

export const ShareMobil: React.FC<MyComponentProps> = ({ url }) => {
  return (
    <div className="ml-4 hover:cursor-pointer">
      <RWebShare
        data={{
          text: "Tip-Tap",
          url: url,
          title: "Tip-Tap",
        }}
        onClick={() => alert("Sharing current page!")}
      >
        <button>
          <ShareIcon className="text-3xl" />
        </button>
      </RWebShare>
    </div>
  );
};

const handleClick = () => {
  alert("URL Copied!");
};

export const ShareBrowser = () => {
  return (
    <div className="ml-4 hover:cursor-pointer">
      <button onClick={handleClick}>
        <ShareIcon className="text-3xl" />
      </button>
    </div>
  );
};
