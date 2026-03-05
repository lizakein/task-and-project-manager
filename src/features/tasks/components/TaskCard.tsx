import { useRef, useMemo } from "react";
import { useDrag } from "react-dnd";
import { useContextMenu } from "@hooks/useContextMenu";
import { getTagStyle } from "@utils/tagUtils";
import { TaskOptions } from "./TaskOptions";
import MoreIcon from "@assets/icons/actions/more-icon.svg";
import ClockIcon from "@assets/icons/ui/clock-icon.svg";
import { TAG_COLORS } from "@constants/tagColors";
import { Priority, Status } from "../types";
import { useTagStore, useTasksStore } from "@store/hooks";
import { Icon, IconButton } from "@ui/index";
import { formatDueDate } from "@utils/formatDueDate";
import { MoveTaskWithKeyboard } from "../hooks/moveTaskWithKeyboard";

interface TaskCardProps {
  id: string;
  title: string | null;
  description: string | null;
  priority: Priority;
  tags: string[] | null;
  dueDate: string | null;
  projectId: string;
  status: Status;
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

  const formatedDate = useMemo(() => formatDueDate(dueDate), [dueDate]);

  return (
    <article
      ref={divRef}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      tabIndex={0}
      role="listitem"
      aria-label={`Task: ${title}, status: ${status}`}
      onKeyDown={(e) => MoveTaskWithKeyboard(e, status, id, updateTask)}
    >
      <div className="task-card__header">
        <p
          className={`chip priority priority--${priority}`}
          aria-label="Priority"
          data-priority={priority}
        >
          {priority}
        </p>
        <IconButton
          ref={buttonRef}
          ariaLabel={`More options for task ${title}`}
          aria-haspopup="menu"
          aria-expanded={openId === id}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleMoreClick(e, id)
          }
          icon={<Icon src={MoreIcon} />}
        />

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
                  className={`chip tag tag--${tag.color}`}
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
            <Icon src={ClockIcon} />
            <span>{formatedDate.formatted}</span>
          </time>
        )}
      </div>
    </article>
  );
}
