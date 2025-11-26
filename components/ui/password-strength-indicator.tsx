'use client';

import { Check, X } from 'lucide-react';
import type { PasswordStrength } from '@/lib/validation';

interface PasswordStrengthIndicatorProps {
    strength: PasswordStrength;
    password: string;
}

export function PasswordStrengthIndicator({ strength, password }: PasswordStrengthIndicatorProps) {
    if (!password) return null;

    // Determine color based on score
    const getColorClasses = () => {
        switch (strength.score) {
            case 0:
                return { bar: 'bg-red-500', text: 'text-red-600' };
            case 1:
                return { bar: 'bg-orange-500', text: 'text-orange-600' };
            case 2:
                return { bar: 'bg-yellow-500', text: 'text-yellow-600' };
            case 3:
                return { bar: 'bg-blue-500', text: 'text-blue-600' };
            case 4:
                return { bar: 'bg-green-500', text: 'text-green-600' };
        }
    };

    const colors = getColorClasses();
    const widthPercentage = (strength.score / 4) * 100;

    return (
        <div className="space-y-3 mt-2">
            {/* Strength bar */}
            <div>
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-medium text-muted-foreground">Password Strength</span>
                    <span className={`text-xs font-semibold ${colors.text}`}>{strength.feedback}</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                        className={`h-full ${colors.bar} transition-all duration-300 ease-out`}
                        style={{ width: `${widthPercentage}%` }}
                    />
                </div>
            </div>

            {/* Requirements checklist */}
            <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground mb-2">Password must contain:</p>
                <RequirementItem
                    met={strength.requirements.minLength}
                    text="At least 8 characters"
                />
                <RequirementItem
                    met={strength.requirements.hasUppercase}
                    text="One uppercase letter (A-Z)"
                />
                <RequirementItem
                    met={strength.requirements.hasLowercase}
                    text="One lowercase letter (a-z)"
                />
                <RequirementItem
                    met={strength.requirements.hasNumber}
                    text="One number (0-9)"
                />
                <RequirementItem
                    met={strength.requirements.hasSpecialChar}
                    text="One special character (!@#$%...)"
                />
                <RequirementItem
                    met={strength.requirements.notCommon}
                    text="Not a common password"
                />
            </div>
        </div>
    );
}

interface RequirementItemProps {
    met: boolean;
    text: string;
}

function RequirementItem({ met, text }: RequirementItemProps) {
    return (
        <div className="flex items-center gap-2">
            {met ? (
                <Check className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
            ) : (
                <X className="w-3.5 h-3.5 text-muted-foreground/40 flex-shrink-0" />
            )}
            <span className={`text-xs ${met ? 'text-foreground' : 'text-muted-foreground'}`}>
                {text}
            </span>
        </div>
    );
}
