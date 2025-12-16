import React, { useEffect } from "react";
import { useGameStore } from "@stores/gameStore";
import { useUserStore } from "@stores/userStore"
import { GatherType, WOOD_TYPES } from "@/constants"
import { InfoCard } from "@components/Gathering/InfoCard";
import { camelCaseString } from "@/helpers"
interface MainGameWrapperProps {
    children: React.ReactNode
}
export function MainGameWrapper({ children }: MainGameWrapperProps) {
    const { loadAllSkills, updateExp, addItem, loadActionName } = useGameStore();
    const { currentUser, updateLastOnline, lastOnline, changeToZeroLastOnline, loadLastOnline } = useUserStore();
    const userId = currentUser?.id;
    const actionName = useGameStore(state => state.actionName);
    const activeResources = actionName
        ? WOOD_TYPES[camelCaseString(actionName)]
        : null;


    useEffect(() => {
        if (userId) {
            loadAllSkills(userId);
        }
    }, [userId]);

    useEffect(() => {

        if (userId) {
            loadLastOnline(userId)
            if (lastOnline !== 0 && activeResources) {
                const now = Date.now()
                const TimeOffline = now - lastOnline
                const actionCount = TimeOffline / activeResources.duration

                console.log(activeResources.duration)
                console.log(lastOnline, 'lastOnline')
                console.log('now', now)
                console.log(actionCount)
                //TODO Apply logic that multiplies exp
                if (actionCount >= 1) {
                    const multipler = Math.floor(actionCount)
                    updateExp(userId || 0, 'wc', activeResources.xpPerAction * multipler)
                    addItem(userId, activeResources.name + 'item', 1 * multipler)
                }
            } else {

                changeToZeroLastOnline(userId)

            }
        }
    }, [userId, lastOnline]);

    useEffect(() => {
        const handlePageHide = () => {
            if (currentUser?.id && lastOnline !== 0) {
                updateLastOnline(currentUser.id);
            }
        };

        window.addEventListener("pagehide", handlePageHide);

        return () => {
            window.removeEventListener("pagehide", handlePageHide);
        };
    }, [currentUser?.id, updateLastOnline]);

    useEffect(() => {
        if (userId) {
            loadActionName(userId);
        }
    }, [actionName, userId]);
    const handleGather = (user: number, resource: GatherType) => {
        updateExp(user || 0, 'wc', resource.xpPerAction)
        addItem(user, resource.name + 'item', 1)
    }

    return (
        <div>MainGameWrapper

            {activeResources && (
                <InfoCard
                    skill="Woodcutting"
                    actionName={activeResources.name}
                    duration={activeResources.duration}
                    onTimesEnd={() => handleGather(userId || 0, activeResources)}
                />
            )}
            {children}
        </div>

    )
}
