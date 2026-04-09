import { useState } from "react";
import { TagsManagerModal } from "./TagsManagerModal/TagsManagerModal";
import { FieldState } from "@app-types/fieldState";
import ManageTagsIcon from "@assets/icons/navigation/settings-icon.svg";
import TagButton from "./TagButton";
import { useTagStore } from "@store/hooks";
import { Icon, IconButton } from "@ui/index";

interface TagsSectionProps {
  tags: FieldState<string[]>;
}

export default function TagsSection({ tags }: TagsSectionProps) {
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const { tags: allTags } = useTagStore();

  const toggleTag = (tagId: string) => {
    tags.setValue((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  return (
    <section className="edit-task-page__section edit-task-page__tags-section">
      <div className="edit-task-page__header">
        <h2 className="edit-task-page__section-title">Tag</h2>
        <IconButton
          ariaLabel="Manage tags"
          onClick={() => setIsTagsModalOpen(true)}
          icon={<Icon src={ManageTagsIcon} />}
        />
      </div>

      <div className="edit-task-page__buttons-group">
        {allTags.map((tag) => (
          <TagButton
            key={tag.id}
            tag={tag}
            selected={tags.value.includes(tag.id)}
            onClick={() => toggleTag(tag.id)}
          />
        ))}

        <TagsManagerModal
          isTagsModalOpen={{
            value: isTagsModalOpen,
            setValue: setIsTagsModalOpen,
          }}
        />
      </div>
    </section>
  );
}
