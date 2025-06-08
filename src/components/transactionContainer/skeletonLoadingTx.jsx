import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./skeleton.css";
import { Colors } from "../../constants/theme";
// Takes on the styles of transction container since that is where it is used
export default function SkeletonLoadingTx() {
  return (
    <div className="skeletonContianer">
      <div className="circle">
        <Skeleton
          style={{ height: "100%", width: "100%", lineHeight: "unset" }}
          baseColor={Colors.constants.halfModalBackground}
          highlightColor={Colors.light.background}
        />
      </div>
      <div className="textContainer">
        <p>
          {
            <Skeleton
              baseColor={Colors.constants.halfModalBackground}
              highlightColor={Colors.light.background}
              style={{ lineHeight: 0.9 }}
            />
          }
        </p>
        <p>
          {
            <Skeleton
              baseColor={Colors.constants.halfModalBackground}
              highlightColor={Colors.light.background}
              style={{ lineHeight: 0.9 }}
            />
          }
        </p>
      </div>
    </div>
  );
}
