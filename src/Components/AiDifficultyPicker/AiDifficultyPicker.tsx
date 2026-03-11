import type { AiDifficulty } from "Services/RnWServer/Data";
import "./AiDifficultyPicker.css";

type DifficultyOption = {
    value: AiDifficulty;
    label: string;
};

const DIFFICULTIES: DifficultyOption[] = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Med" },
    { value: "HARD", label: "Hard" },
    { value: "MAXIMUM", label: "Max" },
];

type AiDifficultyPickerProps = {
    value: AiDifficulty;
    onChange: (difficulty: AiDifficulty) => void;
};

export default function AiDifficultyPicker({ value, onChange }: AiDifficultyPickerProps) {
    return (
        <div className="ai-difficulty-picker">
            <span className="ai-difficulty-label">AI Difficulty</span>
            <div className="ai-difficulty-options">
                {DIFFICULTIES.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className={`ai-difficulty-option${value === option.value ? " selected" : ""}`}
                        onClick={() => onChange(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
