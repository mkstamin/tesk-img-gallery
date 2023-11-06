/* eslint-disable react/prop-types */
const Item = ({
  copyOpacity,
  style,
  setNodeRef,
  attributes,
  listeners,
  data,
  isDragging,
  index,
  handleSelectItem,
}) => {
  const { img, id, isSelected } = data;

  return (
    <div
      className={`${
        index === 0
          ? "col-span-8 sm:col-span-4 row-span-2"
          : "col-span-4 sm:col-span-2"
      } overflow-hidden relative group shadow-[0px_0px_2px_0px_rgba(0,0,0,0.25)]`}
      style={{ transformOrigin: "0 0", borderRadius: "10px", ...style }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div
        className={`flex items-center justify-center bg-white ${
          isDragging ? "shadow-md" : ""
        } ${copyOpacity ? "opacity-50" : "opacity-100"}`}
      >
        {/* When checked */}
        {/* <div className="bg-white/50 absolute top-0 left-0 w-full h-full">
          <input type="checkbox" className="w-5 h-5 m-4" />
        </div> */}

        {/* when hover */}
        {!isDragging ? (
          <div
            className={`absolute top-0 left-0 w-full h-full ${
              isSelected ? "bg-white/50" : "hover:bg-black/40"
            } duration-700 ease-in-out`}
          >
            <input
              type="checkbox"
              className={`w-5 h-5 m-2 sm:m-4 ${
                isSelected ? "" : "group-hover:block hidden"
              }`}
              onChange={(e) => handleSelectItem(e, id)}
              checked={isSelected}
            />
          </div>
        ) : null}

        <img src={img} alt="img" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Item;
