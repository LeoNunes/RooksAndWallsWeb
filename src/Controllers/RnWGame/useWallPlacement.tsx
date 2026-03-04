import { Wall } from "Components/Pieces/Wall";
import type { EdgeCoordinate } from "Domain/Common/Coordinates";
import type { Dispatch } from "Domain/Common/DataTypes";
import type { RnWActions } from "Domain/RnW/Actions";
import type { RnWModel } from "Domain/RnW/Model";
import type { RnWGameAction as ServerGameAction } from "Services/RnWServer/Actions";

export default function useWallPlacement(
    getRnWModel: () => RnWModel,
    getRnWActions: () => RnWActions,
    websocketDispatch: Dispatch<ServerGameAction>,
) {
    const rnwModel = getRnWModel();

    function placeable(props: React.PropsWithChildren) {
        return <Wall>{props.children}</Wall>;
    }

    const placeableCoordinates = rnwModel.availableEdgesForPlacingWalls();

    function onPlace(coord: EdgeCoordinate) {
        getRnWActions().setNextMoveWall(coord);
        getRnWActions().commitMove(websocketDispatch);
    }

    return {
        edgePlaceable: placeable,
        edgePlaceableCoordinates: placeableCoordinates,
        onEdgePlace: onPlace,
    };
}
