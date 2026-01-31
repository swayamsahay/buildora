"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useState } from "react";

// Mock data
const initialData = {
  columns: {
    "new": { id: "new", title: "New Applications", items: ["app-1", "app-2"] },
    "review": { id: "review", title: "In Review", items: ["app-3"] },
    "interview": { id: "interview", title: "Interview", items: ["app-4", "app-5"] },
    "offer": { id: "offer", title: "Offer Sent", items: [] },
    "hired": { id: "hired", title: "Hired", items: ["app-6"] },
  },
  items: {
    "app-1": { id: "app-1", name: "John Doe", role: "Senior Developer", date: "2d ago" },
    "app-2": { id: "app-2", name: "Jane Smith", role: "UX Designer", date: "1d ago" },
    "app-3": { id: "app-3", name: "Mike Johnson", role: "Product Manager", date: "3d ago" },
    "app-4": { id: "app-4", name: "Sarah Wilson", role: "Frontend Dev", date: "4d ago" },
    "app-5": { id: "app-5", name: "Tom Brown", role: "Backend Dev", date: "5d ago" },
    "app-6": { id: "app-6", name: "Emily Davis", role: "QA Engineer", date: "1w ago" },
  }
};

export default function ApplicationsPipelinePage() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId as keyof typeof data.columns];
    const finishColumn = data.columns[destination.droppableId as keyof typeof data.columns];

    if (startColumn === finishColumn) {
      const newItems = Array.from(startColumn.items);
      newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        items: newItems,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Moving from one list to another
    const startItems = Array.from(startColumn.items);
    startItems.splice(source.index, 1);
    const newStart = {
      ...startColumn,
      items: startItems,
    };

    const finishItems = Array.from(finishColumn.items);
    finishItems.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishColumn,
      items: finishItems,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };
  
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Hiring Pipeline</h1>
        <Button>New Application</Button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex h-full min-w-max gap-6">
            {Object.values(data.columns).map((column) => (
              <div key={column.id} className="w-80 flex-shrink-0 flex flex-col rounded-lg bg-slate-100 p-4 dark:bg-slate-800/50">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-700 dark:text-slate-300">
                    {column.title} <span className="ml-2 rounded-full bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-700 dark:text-slate-400">{column.items.length}</span>
                  </h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex-1 space-y-3 min-h-[100px]"
                    >
                      {column.items.map((itemId, index) => {
                        const item = data.items[itemId as keyof typeof data.items];
                        return (
                          <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                              <Card
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`cursor-grab hover:shadow-md transition-shadow ${
                                  snapshot.isDragging ? "shadow-lg ring-2 ring-blue-500 ring-opacity-50" : ""
                                }`}
                                style={provided.draggableProps.style}
                              >
                                <CardContent className="p-4">
                                  <div className="mb-2 flex items-start justify-between">
                                    <h4 className="font-semibold text-slate-900 dark:text-slate-50">{item.name}</h4>
                                  </div>
                                  <p className="text-sm text-slate-500 mb-3">{item.role}</p>
                                  <div className="flex items-center justify-between">
                                    <Badge variant="secondary" className="text-xs font-normal">
                                      {item.date}
                                    </Badge>
                                    <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                      {item.name[0]}
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
