import type { PieceColor } from "RnWConfig";
import blueRookImage from "./resources/img/bluerook.svg";
import blueRookDisabledImage from "./resources/img/bluerookdisabled.svg";
import greenRookImage from "./resources/img/greenrook.svg";
import greenRookDisabledImage from "./resources/img/greenrookdisabled.svg";
import redRookImage from "./resources/img/redrook.svg";
import redRookDisabledImage from "./resources/img/redrookdisabled.svg";
import yellowRookImage from "./resources/img/yellowrook.svg";
import yellowRookDisabledImage from "./resources/img/yellowrookdisabled.svg";

export type PieceConfig = {
    uri: string;
};

export const rnwAssets = {
    pieces: {
        blue: {
            default: { uri: blueRookImage },
            disabled: { uri: blueRookDisabledImage },
        },
        green: {
            default: { uri: greenRookImage },
            disabled: { uri: greenRookDisabledImage },
        },
        red: {
            default: { uri: redRookImage },
            disabled: { uri: redRookDisabledImage },
        },
        yellow: {
            default: { uri: yellowRookImage },
            disabled: { uri: yellowRookDisabledImage },
        },
    } as Record<PieceColor, { default: PieceConfig; disabled: PieceConfig }>,
};
