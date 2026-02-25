import { RnWStateProvider } from "Domain/RnW/RnWStateProvider";
import RnWBoardController, { type RnWBoardControllerProps } from "./RnWBoardController";
import RnWFrameController from "./RnWFrameController";

export type RnWGameProps = RnWBoardControllerProps;
export default function RnWGame(props: RnWGameProps) {
    return (
        <RnWStateProvider>
            <RnWFrameController>
                <RnWBoardController {...props} />
            </RnWFrameController>
        </RnWStateProvider>
    );
}
