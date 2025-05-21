import { TagData } from "@/app/types/types";

type MenuItemTagsContentsProps = {
  tags: TagData[];
};

const MenuItemTagsContents: React.FC<MenuItemTagsContentsProps> = ({
  tags,
}) => {
  return (
    <div className="mt-4">
      <ul className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="px-4 py-2 border rounded text-xs bg-gray-100 text-gray-700"
          >
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemTagsContents;