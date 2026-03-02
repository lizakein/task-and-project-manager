import { useRef, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useContextMenu } from "@hooks/useContextMenu";
import { getTagStyle } from "@utils/tagUtils";
import { TaskOptions } from "./TaskOptions";
import MoreIcon from "@assets/icons/actions/more-icon.svg";
import ClockIcon from "@assets/icons/ui/clock-icon.svg";
import { TAG_COLORS } from "@constants/tagColors";
import { Priority } from "../types";
import { useTagStore, useTasksStore } from "@store/hooks";

interface TaskCardProps {
  id: string;
  title: string | null;
  description: string | null;
  priority: Priority;
  tags: string[] | null;
  dueDate: string | null;
  projectId: string;
  status: "todo" | "in-progress" | "done";
}

export function TaskCard({
  id,
  title,
  description,
  priority,
  tags,
  dueDate,
  projectId,
  status,
}: TaskCardProps) {
  const { openId, menuPosition, handleMoreClick, closeMenu } = useContextMenu();
  const { tags: allTags } = useTagStore();
  const { updateTask } = useTasksStore();

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const divRef = useRef<HTMLDivElement | null>(null);
  drag(divRef);

  const formatedDate = useMemo(() => {
    if (!dueDate) return { formatted: "", isoDate: "" };

    const date = new Date(dueDate);
    const isoDate = date.toISOString();
    let formatted;

    if (dueDate.length > 10) {
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
      };
      formatted = new Date(dueDate).toLocaleDateString("ru-RU", options);
    } else formatted = new Date(dueDate).toLocaleDateString("ru-RU");

    return { formatted, isoDate };
  }, [dueDate]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      if (status === "todo") updateTask(id, { status: "in-progress" });
      else if (status === "in-progress") updateTask(id, { status: "done" });
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      if (status === "done") updateTask(id, { status: "in-progress" });
      else if (status === "in-progress") updateTask(id, { status: "todo" });
    }
  };

  return (
    <article
      ref={divRef}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      tabIndex={0}
      role="listitem"
      aria-label={`Task: ${title}, status: ${status}`}
      onKeyDown={handleKeyDown}
    >
      <div className="task-card__header">
        <p className="priority" aria-label="Priority" data-priority={priority}>
          {priority}
        </p>
        <button
          ref={buttonRef}
          className="icon-button"
          aria-label={`More options for task ${title}`}
          aria-haspopup="menu"
          aria-expanded={openId === id}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleMoreClick(e, id)
          }
        >
          <img src={MoreIcon} alt="" role="presentation" />
        </button>

        {openId === id && menuPosition && (
          <TaskOptions
            menuPosition={menuPosition}
            projectId={projectId}
            openId={openId}
            title={title}
            onClose={closeMenu}
            triggerRef={buttonRef}
          />
        )}
      </div>

      <h3 className="task-card__title">{title}</h3>
      {description && (
        <p className="task-card__description" aria-label="Description">
          {description}
        </p>
      )}

      <div className="task-card__footer">
        <div className="task-card__tags" aria-label="Tags">
          {tags &&
            tags.map((tagId) => {
              const tag = allTags.find((t) => t.id === tagId);
              if (!tag) return null;
              return (
                <span
                  key={tag.id}
                  className={`tag tag--${tag.color}`}
                  style={getTagStyle(tag.color as keyof typeof TAG_COLORS)}
                >
                  {tag.label}
                </span>
              );
            })}
        </div>

        {dueDate && (
          <time
            className="task-card__due"
            aria-label="Deadline"
            dateTime={formatedDate.isoDate}
          >
            <img src={ClockIcon} alt="" role="presentation" />
            <span>{formatedDate.formatted}</span>
          </time>
        )}
      </div>
    </article>
  );
}
