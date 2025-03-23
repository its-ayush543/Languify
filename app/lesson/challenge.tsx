import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
    options : typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "incorrect" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
}

export const Challenge = ({ options, onSelect, status, selectedOption, disabled, type }: Props) => {
    return (
        <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
        )}>
            {options.map((options, i) => (
                <Card 
                key={options.id}
                id={options.id}
                text={options.text}
                imageSrc= {options.imageSrc}
                shortcut={`${i+1}`}
                selected = {selectedOption === options.id}
                onClick = {() => onSelect(options.id)}
                status = {status}
                audioSrc = {options.audioSrc}
                disabled = {disabled}
                type = {type}


                />
            ))}
        </div>
    )
}