import { Icon } from "@/components/ui/icons/Icon";
import { type IconName } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface PageHeaderProps {
    icon?: IconName;
    title: string;
    animateKey?: string;
    className?: string;
    children?: React.ReactNode;
}

export function PageHeader({ icon, title, animateKey, className, children }: PageHeaderProps) {
    const initialKey = useRef(animateKey);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (animateKey !== initialKey.current) {
            setHasChanged(true);
        }
    }, [animateKey]);

    return (
        <div className={cn("flex flex-row items-center justify-between min-h-[36px] h p-4", className)}>
            <div className="flex flex-row items-center gap-2">
                {icon && <Icon name={icon} className="text-icon size-6" />}
                <h3 className="font-cal-sans text-xl h-[36px] leading-[36px]">
                    <span
                        key={animateKey}
                        className={cn(
                            "inline-block",
                            hasChanged && animateKey && "animate-in fade-in slide-in-from-bottom-1 duration-300"
                        )}
                    >
                        {title}
                    </span>
                </h3>
            </div>
            {children}
        </div>
    );
}
