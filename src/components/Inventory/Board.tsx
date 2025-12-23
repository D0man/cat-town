
import { useEffect, useState } from 'react';
import Pinelog from '@assets/items/PineLog_32x32.png';
import { PureItem } from './PureItem';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { DroppableContainer } from './DropableContainer';
import { UniqueIdentifier, ContainersMap, ContainerTitleMap, ItembyDb } from './types';
import { useGameStore } from '@/stores/gameStore';
import { useUserStore } from '@/stores/userStore';
type ItemsByContainer = Record<number, ItembyDb[]>;

const FIRST_CONTAINER_ID = "1";

export function Board() {
    const { inventory, updateInventoryPosition } = useGameStore()
    const { currentUser } = useUserStore();
    const userId = currentUser?.id;
    const currentInventory = useGameStore.getState().inventory;
    const [containers, setContainers] = useState<ContainersMap>({
        "1": [
        ],

    });
    useEffect(() => {
        if (Object.keys(currentInventory).length) {
            const itemsByContainer = Object.values(currentInventory).reduce<ItemsByContainer>(
                (itemsByContainer, { containerId, itemId, amount, position }) => {
                    (itemsByContainer[containerId] ??= []).push({ itemId, amount, position });
                    return itemsByContainer;
                },
                {}
            );

            for (const containerId in itemsByContainer) {
                itemsByContainer[containerId].sort((a, b) => a.position - b.position);
            }
            console.log(itemsByContainer)
            setContainers(itemsByContainer)
        }

    }, [inventory])

    const [filterWord, setFilterWord] = useState('')





    const [containerTitles, setContainerTitles] = useState<ContainerTitleMap>({
        [FIRST_CONTAINER_ID]: "Main Tab",
    });

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    // DND Sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findContainer = (id: UniqueIdentifier) => {
        if (id in containers) return id;
        return Object.keys(containers).find((key) =>
            containers[key].some((item) => item.itemId === id)
        );
    };

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { active, over } = event;
        const id = active.id;
        const overId = over?.id;

        if (!overId) return;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        setContainers((prev) => {
            const activeItems = prev[activeContainer];
            const overItems = prev[overContainer];

            // Find the indexes
            const activeIndex = activeItems.findIndex((item) => item.itemId === id);
            const overIndex = overItems.findIndex((item) => item.itemId === overId);

            let newIndex;
            if (overId in prev) {
                // We're at the root level of a container
                newIndex = overItems.length + 1;
            } else {
                const isBelowLastItem =
                    over &&
                    overIndex === overItems.length - 1 &&
                    active.rect.current.translated &&
                    active.rect.current.translated.top > over.rect.top + over.rect.height;

                const modifier = isBelowLastItem ? 1 : 0;
                newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            return {
                ...prev,
                [activeContainer]: [...prev[activeContainer].filter((item) => item.itemId !== active.id)],
                [overContainer]: [
                    ...prev[overContainer].slice(0, newIndex),
                    containers[activeContainer][activeIndex],
                    ...prev[overContainer].slice(newIndex, prev[overContainer].length),
                ],
            };
        });

    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        const id = active.id;
        const overId = over?.id;

        const activeContainer = findContainer(id);
        const overContainer = overId ? findContainer(overId) : null;

        if (!activeContainer || !overContainer) {
            setActiveId(null);
            return;
        }

        // Handle items moved between containers
        if (activeContainer !== overContainer) {
            const updatedInventory = { ...inventory };
            if (updatedInventory[id as string]) {
                updatedInventory[id as string] = {
                    ...updatedInventory[id as string],
                    containerId: parseInt(overContainer as string),
                    position: containers[overContainer].length + 1,
                };
            }

            if (userId) {
                updateInventoryPosition(userId, updatedInventory).catch(err =>
                    console.error('Failed to update inventory position:', err)
                );
            }
            setActiveId(null);
            return;
        }

        // Handle items reordered within same container
        const activeIndex = containers[activeContainer].findIndex((item) => item.itemId === id);
        const overIndex = containers[overContainer].findIndex((item) => item.itemId === overId);

        if (activeIndex !== overIndex) {
            const newState = arrayMove(containers[overContainer], activeIndex, overIndex);
            setContainers((items) => ({
                ...items,
                [overContainer]: newState,
            }));

            // Sync inventory to DB with updated positions
            const updatedInventory = { ...inventory };
            newState.forEach((item, index) => {
                if (updatedInventory[item.itemId]) {
                    updatedInventory[item.itemId] = {
                        ...updatedInventory[item.itemId],
                        position: index + 1,
                    };
                }
            });

            // Sync to database if user is logged in
            if (userId) {
                updateInventoryPosition(userId, updatedInventory).catch(err =>
                    console.error('Failed to update inventory position:', err)
                );
            }
        }
        setActiveId(null);
    };

    const addContainer = () => {
        const newId = `col-${Date.now()}`;
        setContainers((prev) => ({
            ...prev,
            [newId]: [],
        }));
        setContainerTitles((prev) => ({
            ...prev,
            [newId]: `Column ${Object.keys(prev).length + 1}`,
        }));
    };

    const removeContainer = (containerId: UniqueIdentifier) => {
        if (containerId === FIRST_CONTAINER_ID) return;

        setContainers((prev) => {
            const itemsToMove = prev[containerId];
            const { [containerId]: removed, ...rest } = prev;
            return {
                ...rest,
                [FIRST_CONTAINER_ID]: [...rest[FIRST_CONTAINER_ID], ...itemsToMove],
            };
        });

        setContainerTitles((prev) => {
            const { [containerId]: removed, ...rest } = prev;
            return rest;
        });
    };

    const activeItem = activeId
        ? (Object.values(containers).flat() as ItembyDb[]).find((i) => i.itemId === activeId)
        : null;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <input type="text" className='px-4 py-3
            bg-white text-black
            border-4 border-black
            focus:outline-none focus:bg-yellow-50
            placeholder-gray-400' value={filterWord} onChange={(e) => setFilterWord(e.target.value)} />
                </div>
            </div>

            <div className="flex items-start gap-6 pb-8 overflow-x-auto  snap-x scroll-smooth">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                >
                    {Object.keys(containers).map((containerId) => {
                        return (

                            <DroppableContainer
                                key={containerId}
                                id={containerId}
                                title={containerTitles[containerId]}
                                items={containers[containerId]}
                                filter={filterWord}
                                isFirst={containerId == FIRST_CONTAINER_ID}
                                addContainer={() => addContainer()}
                                onRemoveContainer={removeContainer}
                            />
                        )
                    })}

                    <DragOverlay
                        dropAnimation={{
                            sideEffects: defaultDropAnimationSideEffects({
                                styles: {
                                    active: {
                                        opacity: '0.5',
                                    },
                                },
                            }),
                        }}
                    >
                        {activeId && activeItem ? (
                            <div className="relative  w-12 h-12  border-2 border-indigo-500 scale-105 cursor-grabbing opacity-90 ">
                                <PureItem imgsrc={Pinelog} description={'test'} amount={activeItem.amount} price={1} />
                            </div>
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
}
